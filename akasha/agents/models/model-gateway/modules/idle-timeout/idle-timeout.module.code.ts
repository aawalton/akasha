export const UPSTREAM_IDLE_TIMEOUT_TOKEN = "oauth-proxy upstream idle timeout"

export type IdleGuard = {
  readonly signal: AbortSignal
  reset: () => void
  stop: () => void
}

export type IdleResettable = Pick<IdleGuard, "reset" | "stop">

export type IdleTimers = {
  set: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>
  clear: (handle: ReturnType<typeof setTimeout>) => void
}

const DEFAULT_TIMERS: IdleTimers = {
  set: (fn, ms) => setTimeout(fn, ms),
  clear: (handle) => clearTimeout(handle),
}

export function buildIdleGuard(
  idleMs: number,
  logPrefix: string,
  label: string,
  timers: IdleTimers = DEFAULT_TIMERS
): IdleGuard {
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  const clear = (): undefined => {
    if (timer != null) {
      timers.clear(timer)
      timer = null
    }
  }

  const fire = (): undefined => {
    timer = null
    const message = `${UPSTREAM_IDLE_TIMEOUT_TOKEN}: no upstream bytes for ${idleMs}ms (${label})`
    console.error(`${logPrefix} upstream-idle-timeout ${label} idleMs=${idleMs}`)
    controller.abort(new DOMException(message, "TimeoutError"))
  }

  return {
    signal: controller.signal,
    reset: (): undefined => {
      if (stopped) return
      clear()
      timer = timers.set(fire, idleMs)
    },
    stop: (): undefined => {
      stopped = true
      clear()
    },
  }
}

export type IdleGuardSpec = {
  idleMs: number
  logPrefix: string
  label: string
}

export type IdleFetch = (url: string, init: RequestInit) => Promise<Response>

export type IdleGuardOptions = {
  timers?: IdleTimers
  fetchImpl?: IdleFetch
}

const defaultFetch: IdleFetch = (url, init) => fetch(url, init)

export async function fetchWithIdleGuard(
  url: string,
  init: RequestInit,
  spec: IdleGuardSpec | null,
  options: IdleGuardOptions = {}
): Promise<{ response: Response; idle: IdleResettable | undefined }> {
  const send = options.fetchImpl ?? defaultFetch
  if (spec == null || spec.idleMs <= 0) {
    return { response: await send(url, init), idle: undefined }
  }
  const guard = buildIdleGuard(spec.idleMs, spec.logPrefix, spec.label, options.timers)
  guard.reset()
  try {
    const response = await send(url, { ...init, signal: guard.signal })
    return { response, idle: guard }
  } catch (err) {
    guard.stop()
    throw err
  }
}
