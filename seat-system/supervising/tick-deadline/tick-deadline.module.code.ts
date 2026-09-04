export class TickDeadlineExceededError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TickDeadlineExceededError"
  }
}

export function withTickDeadline<T>(
  label: string,
  fn: () => Promise<T>,
  deadlineMs: number,
  signal?: AbortSignal
): Promise<T> {
  if (signal?.aborted === true) return Promise.reject(signal.reason)

  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let onAbort: (() => void) | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () =>
        reject(
          new TickDeadlineExceededError(`${label}: tick deadline exceeded after ${deadlineMs}ms`)
        ),
      deadlineMs
    )
  })
  const abort =
    signal === undefined
      ? undefined
      : new Promise<never>((_, reject) => {
          onAbort = () => reject(signal.reason)
          signal.addEventListener("abort", onAbort, { once: true })
        })
  const participants: Array<Promise<T>> =
    abort === undefined ? [fn(), timeout] : [fn(), timeout, abort]
  return Promise.race(participants).finally(() => {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
    if (signal !== undefined && onAbort !== undefined) signal.removeEventListener("abort", onAbort)
  })
}
