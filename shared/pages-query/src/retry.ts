export const WRITE_ATTEMPTS = 4

export const FIRST_BACKOFF_MS = 250

export const BACKOFF_CEILING_MS = 4_000

export type Sleeper = (ms: number) => Promise<void>

export const sleep: Sleeper = (ms) =>
  new Promise((wake) => {
    setTimeout(wake, ms)
  })

export function backoffFor(attempt: number): number {
  const flat = Math.min(FIRST_BACKOFF_MS * 2 ** (attempt - 1), BACKOFF_CEILING_MS)
  return flat + Math.floor(Math.random() * (flat / 2))
}

export function worthRetrying(status: number | undefined): boolean {
  if (status === undefined) return true
  return status >= 500 || status === 429
}
