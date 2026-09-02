declare global {
  type LuaMultiReturn<T extends unknown[]> = T & {
    readonly __tstlMultiReturn: unknown
  }

  const $multi: <T extends unknown[]>(this: void, ...values: T) => LuaMultiReturn<T>

  function error(this: void, message: unknown, level?: number): never

  function tostring(this: void, v: unknown): string

  const math: {
    floor: (this: void, x: number) => number
    min: (this: void, x: number, ...numbers: number[]) => number
  }

  const _G: Record<string, unknown>

  interface ZoObjectClass {
    Subclass: <T = object>(this: ZoObjectClass) => T
    New: <T = object>(this: void, self: object) => T
  }
  const ZO_Object: ZoObjectClass

  interface ZoCallbackObjectInstance {
    RegisterCallback: (
      this: ZoCallbackObjectInstance,
      callbackName: string,
      callback: (this: void, ...args: unknown[]) => void
    ) => void
    UnregisterCallback: (
      this: ZoCallbackObjectInstance,
      callbackName: string,
      callback: (this: void, ...args: unknown[]) => void
    ) => void
    FireCallbacks: (
      this: ZoCallbackObjectInstance,
      callbackName: string,
      ...args: unknown[]
    ) => void
  }
  interface ZoCallbackObjectClass {
    New: (this: ZoCallbackObjectClass) => ZoCallbackObjectInstance
  }
  const ZO_CallbackObject: ZoCallbackObjectClass

  interface EventManager {
    RegisterForEvent: <T extends unknown[] = unknown[]>(
      namespace: string,
      event: number,
      callback: (eventCode: number, ...args: T) => void
    ) => boolean
    UnregisterForEvent: (namespace: string, event: number) => boolean
    RegisterForUpdate: (namespace: string, interval: number, callback: () => void) => boolean
    UnregisterForUpdate: (namespace: string) => boolean
  }
  const EVENT_MANAGER: EventManager

  interface DebugLogger {
    Debug: (...args: unknown[]) => void
    Verbose: (...args: unknown[]) => void
  }

  type LibDebugLogger = (this: void, tag: string) => DebugLogger
  const LibDebugLogger: LibDebugLogger | undefined

  interface WorldMapManagerControl {
    UnregisterForEvent: (this: WorldMapManagerControl, event: number) => boolean
  }
  interface WorldMapManager {
    control: WorldMapManagerControl
  }
  const WORLD_MAP_MANAGER: WorldMapManager

  const ZO_WorldMap_GetPinManager: (this: void) => unknown

  const GetCurrentMapId: (this: void) => number
  const GetGameTimeMilliseconds: (this: void) => number
  const GetGroupIndexByUnitTag: (this: void, unitTag?: string) => number
  const GetGroupUnitTagByIndex: (this: void, sortIndex?: number) => string | undefined
  const IsUnitGrouped: (this: void, unitTag?: string) => boolean
  const IsUnitInCombat: (this: void, unitTag?: string) => boolean
  const PlaySound: (this: void, soundName?: string) => void

  const SOUNDS: Readonly<Record<string, string>>

  const EVENT_ADD_ON_LOADED: number
  const EVENT_MAP_PING: number
  const MAP_PIN_TYPE_PING: number
  const MAP_PIN_TYPE_PLAYER_WAYPOINT: number
  const MAP_PIN_TYPE_RALLY_POINT: number
  const MAP_TYPE_LOCATION_CENTERED: number
  const PING_EVENT_ADDED: number
  const PING_EVENT_REMOVED: number
}

export {}
