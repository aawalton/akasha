import { __TS__Timers } from "akasha/design/language/lua-compiler/lualibs/timers/timers.lualib.code.ts"

declare function zo_callLater(this: void, fn: (this: void) => void, ms: number): undefined

const cancelled = __TS__Timers.cancelled
const clampMs = __TS__Timers.clampMs

export function __TS__SetTimeout(this: void, fn: (this: void) => void, ms: number): number {
  __TS__Timers.nextHandle = __TS__Timers.nextHandle + 1
  const handle = __TS__Timers.nextHandle
  zo_callLater(() => {
    if (cancelled.get(handle) === true) {
      cancelled.set(handle, undefined)
      return
    }
    fn()
  }, clampMs(ms))
  return handle
}
