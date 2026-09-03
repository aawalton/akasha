declare function zo_callLater(this: void, fn: (this: void) => void, ms: number): void
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

let nextHandle = 0
const cancelled = new LuaTable<number, boolean | undefined>()
const intervalNames = new LuaTable<number, string | undefined>()

const INTERVAL_NAME_PREFIX = "__TS__SetInterval_"

function clampMs(this: void, ms: number): number {
  if (ms !== ms) return 0
  if (ms < 0) return 0
  return ms
}

export function __TS__SetTimeout(this: void, fn: (this: void) => void, ms: number): number {
  nextHandle = nextHandle + 1
  const handle = nextHandle
  zo_callLater(() => {
    if (cancelled.get(handle) === true) {
      cancelled.set(handle, undefined)
      return
    }
    fn()
  }, clampMs(ms))
  return handle
}

export function __TS__ClearTimeout(this: void, handle: number): undefined {
  cancelled.set(handle, true)
}

export function __TS__SetInterval(this: void, fn: (this: void) => void, ms: number): number {
  nextHandle = nextHandle + 1
  const handle = nextHandle
  const name = INTERVAL_NAME_PREFIX + tostring(handle)
  intervalNames.set(handle, name)
  EVENT_MANAGER.RegisterForUpdate(name, clampMs(ms), fn)
  return handle
}

export function __TS__ClearInterval(this: void, handle: number): undefined {
  const name = intervalNames.get(handle)
  if (name === undefined) return
  intervalNames.set(handle, undefined)
  EVENT_MANAGER.UnregisterForUpdate(name)
}

export function __TS__QueueMicrotask(this: void, fn: (this: void) => void): undefined {
  zo_callLater(fn, 0)
}
