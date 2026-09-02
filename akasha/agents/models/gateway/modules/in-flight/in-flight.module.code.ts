export type IdleReading = { readonly idle: boolean }

export type IdleWaitTimers = {
  readonly waited: (ms: number, fired: () => undefined) => () => undefined
}

export const REAL_WAIT_TIMERS: IdleWaitTimers = {
  waited: (ms, fired) => {
    const handle = setTimeout(fired, ms)
    handle.unref?.()
    return (): undefined => {
      clearTimeout(handle)
    }
  },
}

export type InFlightTracker = {
  readonly begin: () => undefined
  readonly end: () => undefined
  readonly whenIdle: (timeoutMs: number) => Promise<IdleReading>
  readonly getCount: () => number
}

export function buildInFlightTracker(timers: IdleWaitTimers = REAL_WAIT_TIMERS): InFlightTracker {
  let count = 0
  const waiting = new Set<(reading: IdleReading) => undefined>()

  function begin(): undefined {
    count += 1
  }

  function end(): undefined {
    if (count <= 0) {
      count = 0
      return
    }
    count -= 1
    if (count > 0) return
    const pending = [...waiting]
    waiting.clear()
    for (const one of pending) one({ idle: true })
  }

  function whenIdle(timeoutMs: number): Promise<IdleReading> {
    if (count === 0) return Promise.resolve({ idle: true })
    return new Promise((resolve) => {
      let settled = false
      let stopped: (() => undefined) | null = null
      const settle = (reading: IdleReading): undefined => {
        if (settled) return
        settled = true
        waiting.delete(settle)
        stopped?.()
        resolve(reading)
      }
      waiting.add(settle)
      stopped = timers.waited(timeoutMs, () => settle({ idle: false }))
      if (settled) stopped()
    })
  }

  function getCount(): number {
    return count
  }

  return { begin, end, whenIdle, getCount }
}
