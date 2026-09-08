import { __TS__Timers } from "../timers/timers.lualib.code.ts"

const cancelled = __TS__Timers.cancelled

export function __TS__ClearTimeout(this: void, handle: number): undefined {
  cancelled.set(handle, true)
}
