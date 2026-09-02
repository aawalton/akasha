export const KEEPALIVE_COMMENT_BYTES: Uint8Array = new TextEncoder().encode(": keepalive\n")

export const DEFAULT_DOWNSTREAM_KEEPALIVE_MS = 3500

export type KeepaliveTimers = {
  set: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>
  clear: (handle: ReturnType<typeof setTimeout>) => void
}

const DEFAULT_TIMERS: KeepaliveTimers = {
  set: (fn, ms) => setTimeout(fn, ms),
  clear: (handle) => clearTimeout(handle),
}

export type KeepaliveEmitter = {
  reset: () => void
  stop: () => void
}

export type KeepaliveOptions = {
  intervalMs: number
  timers?: KeepaliveTimers
}

export function buildKeepaliveEmitter(
  intervalMs: number,
  emit: () => void,
  timers: KeepaliveTimers = DEFAULT_TIMERS
): KeepaliveEmitter {
  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  const clear = (): undefined => {
    if (timer != null) {
      timers.clear(timer)
      timer = null
    }
  }

  const arm = (): undefined => {
    timer = timers.set(fire, intervalMs)
  }

  function fire(): undefined {
    timer = null
    if (stopped) return
    emit()
    if (!stopped) arm()
  }

  return {
    reset: (): undefined => {
      if (stopped) return
      clear()
      arm()
    },
    stop: (): undefined => {
      stopped = true
      clear()
    },
  }
}
