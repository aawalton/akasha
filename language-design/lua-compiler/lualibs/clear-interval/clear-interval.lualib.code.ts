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

export function __TS__ClearInterval(this: void, handle: number): undefined {
  const name = intervalNames.get(handle)
  if (name === undefined) return
  intervalNames.set(handle, undefined)
  EVENT_MANAGER.UnregisterForUpdate(name)
}
