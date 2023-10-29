const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // 检查环境变量
  if (!process.env.MY_REQUIRED_ENV_VAR) {
    console.error('Missing MY_REQUIRED_ENV_VAR. Cannot start server.');
    process.exit(1);  // 退出进程
  }

  server.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  server.listen(3000, (err: any) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000');
  })
})
