declare global {
  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }

  const $multi: <T extends unknown[]>(...values: T) => LuaMultiReturn<T>

  function pairs<T>(this: void, t: T): Iterable<[keyof T, NonNullable<T[keyof T]>]>

  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  function tostring(this: void, v: unknown): string
  function tonumber(this: void, e: unknown, base?: number): number | undefined
  function error(this: void, message: unknown, level?: number): never

  const string: {
    sub: (this: void, s: string, i: number, j?: number) => string
    len: (this: void, s: string) => number
    byte: (this: void, s: string, i?: number) => number
    format: (this: void, format: string, ...args: readonly unknown[]) => string
    find: (
      this: void,
      s: string,
      pattern: string,
      init?: number,
      plain?: boolean
    ) => LuaMultiReturn<[number, number] | []>
  }

  const math: {
    floor: (this: void, x: number) => number
  }

  const NonContiguousCount: (this: void, t: object) => number
  const ZO_ShallowTableCopy: <T>(this: void, source: T) => T
  const GetDisplayName: (this: void) => string

  interface ZoInitializingObjectClass {
    Subclass: <T = object>(this: ZoInitializingObjectClass) => T
  }
  const ZO_InitializingObject: ZoInitializingObjectClass

  interface LibDebugLoggerInstance {
    Log: (this: LibDebugLoggerInstance, level: unknown, ...args: readonly unknown[]) => undefined
  }

  interface LibDebugLoggerClass {
    Create: (this: void, name: string) => LibDebugLoggerInstance
    LOG_LEVEL_VERBOSE: unknown
    LOG_LEVEL_DEBUG: unknown
    LOG_LEVEL_INFO: unknown
    LOG_LEVEL_WARNING: unknown
    LOG_LEVEL_ERROR: unknown
  }

  const LibDebugLogger: LibDebugLoggerClass | undefined

  const EVENT_MANAGER: {
    RegisterForEvent: (
      this: void,
      name: string,
      event: number,
      callback: (this: void, eventCode: number, ...args: never[]) => undefined
    ) => undefined
    UnregisterForEvent: (this: void, name: string, event: number) => undefined
  }

  const EVENT_ADD_ON_LOADED: number
}

export {}
