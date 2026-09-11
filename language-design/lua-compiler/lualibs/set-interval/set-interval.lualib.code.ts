import { __TS__Timers } from "akasha/language-design/lua-compiler/lualibs/timers/timers.lualib.code.ts"

interface EventManager {
  RegisterForUpdate: (
    this: EventManager,
    name: string,
    intervalMs: number,
    fn: (this: void) => void
  ) => void
  UnregisterForUpdate: (this: EventManager, name: string) => void
}
declare const EVENT_MANAGER: EventManager

const intervalNames = __TS__Timers.intervalNames
const clampMs = __TS__Timers.clampMs

const INTERVAL_NAME_PREFIX = "__TS__SetInterval_"

export function __TS__SetInterval(this: void, fn: (this: void) => void, ms: number): number {
  __TS__Timers.nextHandle = __TS__Timers.nextHandle + 1
  const handle = __TS__Timers.nextHandle
  const name = INTERVAL_NAME_PREFIX + tostring(handle)
  intervalNames.set(handle, name)
  EVENT_MANAGER.RegisterForUpdate(name, clampMs(ms), fn)
  return handle
}
