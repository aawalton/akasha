// Every standing workstation service ticks and then waits, and each one wrote this wait for
// itself: ten copies of one shape, which is ten places for a stop to stop being honoured.

export function sleptUntilStopped(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    const cleanup = (): undefined => {
      clearTimeout(timer)
      signal.removeEventListener("abort", onAbort)
      return undefined
    }
    const onAbort = (): undefined => {
      cleanup()
      resolve(false)
      return undefined
    }
    const timer = setTimeout(() => {
      cleanup()
      resolve(true)
    }, ms)
    signal.addEventListener("abort", onAbort, { once: true })
  })
}

export function stopsOnSignal(): AbortController {
  const asked = new AbortController()
  for (const signal of ["SIGTERM", "SIGINT"] as const) {
    process.on(signal, () => {
      asked.abort()
    })
  }
  return asked
}
