export type LockPriority = "high" | "normal"

export function createMutex(): {
  withLock: <T>(fn: () => Promise<T>, priority?: LockPriority) => Promise<T>
} {
  let locked = false
  const highWaiters: Array<() => void> = []
  const normalWaiters: Array<() => void> = []

  const acquire = (priority: LockPriority): Promise<void> => {
    if (!locked) {
      locked = true
      return Promise.resolve()
    }
    return new Promise<void>((resolve) => {
      if (priority === "high") highWaiters.push(resolve)
      else normalWaiters.push(resolve)
    })
  }

  const release = (): undefined => {
    const next = highWaiters.shift() ?? normalWaiters.shift()
    if (next === undefined) {
      locked = false
      return
    }
    next()
  }

  const withLock = async <T>(
    fn: () => Promise<T>,
    priority: LockPriority = "normal"
  ): Promise<T> => {
    await acquire(priority)
    try {
      return await fn()
    } finally {
      release()
    }
  }

  return { withLock }
}
