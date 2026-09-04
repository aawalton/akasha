export const BIND_RETRY_BUDGET_MS = 15_000

export const BIND_RETRY_INTERVAL_MS = 50

export type BindRetryClock = {
  now: () => number
  sleep: (ms: number) => undefined
}

const DEFAULT_CLOCK: BindRetryClock = {
  now: () => Date.now(),
  sleep: (ms): undefined => {
    Bun.sleepSync(ms)
  },
}

export type BindRetryOptions = {
  budgetMs?: number
  intervalMs?: number
  clock?: BindRetryClock
}

function isEAddrInUse(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  if ("code" in err && err.code === "EADDRINUSE") return true
  return /EADDRINUSE/i.test(err.message)
}

export function bindWithRetry<T>(
  requestedPort: number,
  logPrefix: string,
  attempt: () => T,
  options: BindRetryOptions = {}
): T {
  const budgetMs = options.budgetMs ?? BIND_RETRY_BUDGET_MS
  const intervalMs = options.intervalMs ?? BIND_RETRY_INTERVAL_MS
  const clock = options.clock ?? DEFAULT_CLOCK
  const deadline = clock.now() + budgetMs
  while (true) {
    try {
      return attempt()
    } catch (err) {
      if (requestedPort !== 0 && isEAddrInUse(err)) {
        if (clock.now() < deadline) {
          console.error(`${logPrefix} bind to port ${requestedPort} hit EADDRINUSE; retrying`)
          clock.sleep(intervalMs)
          continue
        }
        console.error(
          `${logPrefix} bind to port ${requestedPort} failed after ${budgetMs}ms — giving up`
        )
      }
      throw err
    }
  }
}
