import { armedTimer } from "akasha/utils/timing/armed-timer/armed-timer.module.code.ts"

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

export function buildIdleGuard(
  idleMs: number,
  logPrefix: string,
  label: string,
  timers?: IdleTimers
): IdleGuard {
  const controller = new AbortController()

  const fire = (): undefined => {
    const message = `${UPSTREAM_IDLE_TIMEOUT_TOKEN}: no upstream bytes for ${idleMs}ms (${label})`
    console.error(`${logPrefix} upstream-idle-timeout ${label} idleMs=${idleMs}`)
    controller.abort(new DOMException(message, "TimeoutError"))
  }

  const armed = armedTimer(idleMs, fire, timers)

  return {
    signal: controller.signal,
    reset: armed.reset,
    stop: armed.stop,
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
