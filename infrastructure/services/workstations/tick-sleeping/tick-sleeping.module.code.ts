import { leftWhereCodeMoved } from "akasha/infrastructure/services/workstations/modules/code-moving/code-moving.module.code.ts"

export function sleptUntilStopped(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  leftWhereCodeMoved()
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
