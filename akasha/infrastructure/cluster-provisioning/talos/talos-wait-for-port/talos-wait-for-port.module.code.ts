import { createConnection } from "node:net"

export interface WaitForPortOptions {
  readonly host: string
  readonly port: number
  readonly timeoutMs: number
  readonly intervalMs: number
  readonly onTick?: (elapsedMs: number) => void
}

export async function waitForPort(opts: WaitForPortOptions): Promise<void> {
  const start = Date.now()
  while (Date.now() - start < opts.timeoutMs) {
    if (await probe(opts.host, opts.port, opts.intervalMs)) {
      return
    }
    if (opts.onTick) opts.onTick(Date.now() - start)
    await sleep(opts.intervalMs)
  }
  throw new Error(
    `timed out after ${opts.timeoutMs}ms waiting for ${opts.host}:${opts.port} to accept connections`
  )
}

async function probe(host: string, port: number, perAttemptMs: number): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const socket = createConnection({ host, port, timeout: perAttemptMs })
    let settled = false
    const done = (ok: boolean) => {
      if (settled) return
      settled = true
      socket.destroy()
      resolve(ok)
    }
    socket.on("connect", () => done(true))
    socket.on("timeout", () => done(false))
    socket.on("error", () => done(false))
  })
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
