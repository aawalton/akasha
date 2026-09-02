declare global {
  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }

  type LuaIterable<T> = Iterable<T>

  const $multi: <T extends unknown[]>(...values: T) => LuaMultiReturn<T>

  function error(this: void, message: unknown, level?: number): never
  function tostring(this: void, v: unknown): string
  function tonumber(this: void, e: unknown, base?: number): number | undefined
  function type(
    this: void,
    v: unknown
  ): "nil" | "number" | "string" | "boolean" | "table" | "function" | "thread" | "userdata"

  const next: <T>(this: void, list: T, key?: unknown) => LuaMultiReturn<[unknown, unknown]>
  const rawget: <T>(this: void, list: T, key: unknown) => unknown
  const rawset: <T>(this: void, list: T, key: unknown, value: unknown) => T
  const pcall: <A extends unknown[], R>(
    this: void,
    f: (this: void, ...args: A) => R,
    ...args: A
  ) => LuaMultiReturn<[boolean, R]>

  const string: {
    format: (this: void, formatstring: string, ...args: unknown[]) => string
  }

  interface Scene {
    IsShowing: (this: Scene) => boolean
  }

  const HUD_SCENE: Scene
  const HUD_UI_SCENE: Scene

  interface ZoInitializingCallbackObjectClass {
    Subclass: <T>(this: ZoInitializingCallbackObjectClass) => T
    New: <T>(this: void, self: object) => T
  }
  const ZO_InitializingCallbackObject: ZoInitializingCallbackObjectClass

  interface AsyncEventManager {
    RegisterForUpdate: (
      this: AsyncEventManager,
      namespace: string,
      interval: number,
      callback: (this: void) => void
    ) => void
    UnregisterForUpdate: (this: AsyncEventManager, namespace: string) => void
    RegisterForEvent: (
      this: AsyncEventManager,
      namespace: string,
      event: number,
      callback: (this: void, eventCode: number, ...args: never[]) => void
    ) => boolean
    UnregisterForEvent: (this: AsyncEventManager, namespace: string, event: number) => boolean
  }
  const EVENT_MANAGER: AsyncEventManager

  interface AsyncChatRouter {
    AddSystemMessage: (this: AsyncChatRouter, message: string) => void
  }
  const CHAT_ROUTER: AsyncChatRouter

  const SLASH_COMMANDS: Record<string, (this: void, params: string) => void>

  const EVENT_ADD_ON_LOADED: number
  const EVENT_PLAYER_ACTIVATED: number

  const df: (this: void, formatter: string, ...args: unknown[]) => void

  const GetFrameTimeSeconds: (this: void) => number
  const GetGameTimeSeconds: (this: void) => number
  const GetFramerate: (this: void) => number
  const GetTotalUserAddOnCPUTimeAvailableEachFrameMS: (this: void) => number
  const GetTotalUserAddOnCPUTimeUsedNowMS: (this: void) => number

  const ZO_ClearNumericallyIndexedTable: <T>(this: void, list: T[]) => undefined
  const ZO_IsConsoleOrGameCoreUI: (this: void) => boolean

  const zo_max: (this: void, ...values: number[]) => number
  const zo_min: (this: void, ...values: number[]) => number
  const zo_floor: (this: void, value: number) => number
  const zo_strtrim: (this: void, text: string) => string
  const zo_strlower: (this: void, text: string) => string
  const zo_strgmatch: (
    this: void,
    s: string,
    pattern: string
  ) => LuaIterable<LuaMultiReturn<[string]>>

  interface LibDebugLoggerInstance {
    Debug: (this: LibDebugLoggerInstance, ...args: unknown[]) => void
    Warn: (this: LibDebugLoggerInstance, ...args: unknown[]) => void
  }
  const LibDebugLogger: ((this: void, name: string) => LibDebugLoggerInstance) | undefined
}

export {}
