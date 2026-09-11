import { armedTimer } from "akasha/utils/timing/armed-timer/armed-timer.module.code.ts"

export const KEEPALIVE_COMMENT_BYTES: Uint8Array = new TextEncoder().encode(": keepalive\n")

export const DEFAULT_DOWNSTREAM_KEEPALIVE_MS = 3500

export type KeepaliveTimers = {
  set: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>
  clear: (handle: ReturnType<typeof setTimeout>) => void
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
  timers?: KeepaliveTimers
): KeepaliveEmitter {
  function fire(): undefined {
    if (armed.isStopped()) return
    emit()
    if (!armed.isStopped()) armed.arm()
  }

  const armed = armedTimer(intervalMs, fire, timers)

  return { reset: armed.reset, stop: armed.stop }
}
