function tryConnect(host: string, port: number, perAttemptMs: number): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    let settled = false
    const finish = (ok: boolean): undefined => {
      if (settled) {
        return
      }
      settled = true
      resolve(ok)
    }
    Bun.connect({
      hostname: host,
      port,
      socket: {
        data() {},
        open(socket) {
          socket.end()
          finish(true)
        },
        error() {
          finish(false)
        },
        connectError() {
          finish(false)
        },
      },
    }).catch(() => {
      finish(false)
    })
    setTimeout(() => {
      finish(false)
    }, perAttemptMs)
  })
}

export async function waitForPort(
  host: string,
  port: number,
  opts: { timeoutMs: number; intervalMs: number }
): Promise<boolean> {
  const deadline = Date.now() + opts.timeoutMs
  const perAttemptMs = Math.max(opts.intervalMs, 1)
  for (;;) {
    if (await tryConnect(host, port, perAttemptMs)) {
      return true
    }
    if (Date.now() >= deadline) {
      return false
    }
    await new Promise<void>((resolve) => setTimeout(resolve, opts.intervalMs))
  }
}

export async function waitForPortFree(
  host: string,
  port: number,
  opts: { timeoutMs: number; intervalMs: number }
): Promise<boolean> {
  const deadline = Date.now() + opts.timeoutMs
  const perAttemptMs = Math.max(opts.intervalMs, 1)
  for (;;) {
    if (!(await tryConnect(host, port, perAttemptMs))) {
      return true
    }
    if (Date.now() >= deadline) {
      return false
    }
    await new Promise<void>((resolve) => setTimeout(resolve, opts.intervalMs))
  }
}
