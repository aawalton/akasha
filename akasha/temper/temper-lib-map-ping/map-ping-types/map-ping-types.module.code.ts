export type CoordFn = (this: void, pingTag?: string) => LuaMultiReturn<[number, number]>

export type EsoVoidFn = (this: void, ...args: unknown[]) => unknown

export type SuccessFn = (this: void, worldX: number, worldY: number, worldZ: number) => boolean

export type GlobalFnTable = Record<string, EsoVoidFn | undefined>

export type GlobalObjectTable = Record<string, unknown>

export interface OriginalFns {
  PingMap: EsoVoidFn
  SetPlayerWaypointByWorldLocation: SuccessFn
  GetMapPlayerWaypoint: CoordFn
  GetMapPing: CoordFn
  GetMapRallyPoint: CoordFn
  RemovePlayerWaypoint: EsoVoidFn
  RemoveRallyPoint: EsoVoidFn
}

export interface LmpPinManager {
  CreatePin: (
    this: LmpPinManager,
    pinType: number,
    pinTag: unknown,
    locX: number,
    locY: number
  ) => void
  RemovePins: (this: LmpPinManager, category: string, pinType: number, pinTag: unknown) => void
}

export type PendingPing = [
  pingEventType: number,
  pingType: number,
  x: number,
  y: number,
  mapId?: number,
]

export interface CallbackNames {
  readonly BEFORE_PING_ADDED: string
  readonly AFTER_PING_ADDED: string
  readonly BEFORE_PING_REMOVED: string
  readonly AFTER_PING_REMOVED: string
}

export interface MapPingStateValues {
  readonly NOT_SET: number
  readonly NOT_SET_PENDING: number
  readonly SET_PENDING: number
  readonly SET: number
}

export interface RollingAverageMethods {
  Initialize: (this: RollingAverageInstance, timeframe: number, resolution: number) => undefined
  GetCurrentIndex: (this: RollingAverageInstance) => number
  Increment: (this: RollingAverageInstance) => undefined
  GetAverage: (this: RollingAverageInstance) => number
}
export interface RollingAverageInstance extends RollingAverageMethods {
  timeframe: number
  resolution: number
  count: number
  sumList: Record<number, number>
  lastIndex: number
}
export interface RollingAverageClass extends RollingAverageMethods {
  New: (this: RollingAverageClass, timeframe: number, resolution: number) => RollingAverageInstance
}

export interface LeakyBucketMethods {
  Initialize: (this: LeakyBucketInstance) => undefined
  GetTokensLeft: (this: LeakyBucketInstance) => number
  HasTokensLeft: (this: LeakyBucketInstance) => boolean
  Take: (this: LeakyBucketInstance) => boolean
}
export interface LeakyBucketInstance extends LeakyBucketMethods {
  average: RollingAverageInstance
  size: number
  generatedTokens: number
  safetyThreshold: number
  left: number
  lastCheck: number
}
export interface LeakyBucketClass extends LeakyBucketMethods {
  New: (this: LeakyBucketClass) => LeakyBucketInstance
}

export interface MapPingHandlerMethods {
  Initialize: (this: MapPingHandlerInstance) => undefined
  GetKey: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => string
  HandleMapPing: (
    this: MapPingHandlerInstance,
    eventCode: number,
    pingEventType: number,
    pingType: number,
    pingTag: string,
    x: number,
    y: number,
    isPingOwner: boolean
  ) => undefined
  HandleMapPingAdded: (
    this: MapPingHandlerInstance,
    key: string,
    pingType: number,
    pingTag: string,
    x: number,
    y: number,
    isPingOwner: boolean
  ) => undefined
  HandleMapPingRemoved: (
    this: MapPingHandlerInstance,
    key: string,
    pingType: number,
    pingTag: string,
    x: number,
    y: number,
    isPingOwner: boolean
  ) => undefined
  HandleMapPingEventNotFired: (this: MapPingHandlerInstance) => undefined
  ResetEventWatchdog: (this: MapPingHandlerInstance, key: string, ...data: PendingPing) => undefined
  PingMap: (
    this: MapPingHandlerInstance,
    pingType: number,
    mapType: number,
    x: number,
    y: number
  ) => unknown
  SetPlayerWaypointByWorldLocation: (
    this: MapPingHandlerInstance,
    worldX: number,
    worldY: number,
    worldZ: number
  ) => boolean
  GetMapPlayerWaypoint: (this: MapPingHandlerInstance) => LuaMultiReturn<[number, number]>
  GetMapPing: (this: MapPingHandlerInstance, pingTag?: string) => LuaMultiReturn<[number, number]>
  GetMapRallyPoint: (this: MapPingHandlerInstance) => LuaMultiReturn<[number, number]>
  RemovePlayerWaypoint: (this: MapPingHandlerInstance) => unknown
  RemoveMapPing: (this: MapPingHandlerInstance) => undefined
  RemoveRallyPoint: (this: MapPingHandlerInstance) => undefined
  RemoveMapPingByType: (this: MapPingHandlerInstance, pingType: number) => undefined
  GetMapPingByType: (
    this: MapPingHandlerInstance,
    pingType: number,
    pingTag?: string
  ) => LuaMultiReturn<[number, number]>
  GetRawMapPingByType: (
    this: MapPingHandlerInstance,
    pingType: number,
    pingTag?: string
  ) => LuaMultiReturn<[number, number]>
  GetMapPingState: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => number
  HasMapPing: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => boolean
  RefreshMapPin: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => boolean
  IsPositionOnMap: (this: MapPingHandlerInstance, x: number, y: number) => boolean
  MutePing: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => undefined
  UnmutePing: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => undefined
  IsPingMuted: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => boolean
  SuppressPing: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => undefined
  UnsuppressPing: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => undefined
  IsPingSuppressed: (this: MapPingHandlerInstance, pingType: number, pingTag?: string) => boolean
}
export interface MapPingHandlerInstance extends MapPingHandlerMethods {
  mapPinManager: LmpPinManager
  bucket: LeakyBucketInstance
  mutePing: Record<string, number | undefined>
  suppressPing: Record<string, number | undefined>
  pingState: Record<string, number | undefined>
  pendingPing: Record<string, PendingPing | undefined>
  original: OriginalFns
  getter: Record<number, CoordFn | undefined>
  rawGetter: Record<number, CoordFn | undefined>
  remover: Record<number, EsoVoidFn | undefined>
  watchDogCallback: (this: void) => void
  updateHandle?: string
}
export interface MapPingHandlerClass extends MapPingHandlerMethods {
  New: (this: MapPingHandlerClass) => MapPingHandlerInstance
}

export interface InternalState {
  callbackObject: ZoCallbackObjectInstance
  callback: CallbackNames
  MapPingState: MapPingStateValues
  logger: DebugLogger
  handler?: MapPingHandlerInstance
  RegisterForEvent: <T extends unknown[] = unknown[]>(
    this: void,
    event: number,
    callback: (eventCode: number, ...args: T) => void
  ) => string
  UnregisterForEvent: (this: void, namespace: string, event: number) => boolean
  RegisterForUpdate: (this: void, interval: number, callback: (this: void) => void) => string
  UnregisterForUpdate: (this: void, namespace: string) => boolean
  FireCallbacks: (this: InternalState, eventName: string, ...args: unknown[]) => undefined
  RegisterCallback: (
    this: InternalState,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => undefined
  UnregisterCallback: (
    this: InternalState,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => undefined
}

export interface Lib {
  internal: InternalState
  MapPingState: MapPingStateValues
  callback: CallbackNames
  SetMapPing: (
    this: Lib,
    pingType: number | false,
    mapTypeOrWorldX: number,
    xOrWorldY: number,
    yOrWorldZ: number
  ) => boolean | undefined
  RemoveMapPing: (this: Lib, pingType: number) => undefined
  GetMapPing: (this: Lib, pingType: number, pingTag?: string) => LuaMultiReturn<[number, number]>
  GetRawMapPing: (this: Lib, pingType: number, pingTag?: string) => LuaMultiReturn<[number, number]>
  GetMapPingState: (this: Lib, pingType: number, pingTag?: string) => number
  HasMapPing: (this: Lib, pingType: number, pingTag?: string) => boolean
  RefreshMapPin: (this: Lib, pingType: number, pingTag?: string) => boolean
  IsPositionOnMap: (this: Lib, x: number, y: number) => boolean
  MutePing: (this: Lib, pingType: number, pingTag?: string) => undefined
  UnmutePing: (this: Lib, pingType: number, pingTag?: string) => undefined
  IsPingMuted: (this: Lib, pingType: number, pingTag?: string) => undefined
  SuppressPing: (this: Lib, pingType: number, pingTag?: string) => undefined
  UnsuppressPing: (this: Lib, pingType: number, pingTag?: string) => undefined
  IsPingSuppressed: (this: Lib, pingType: number, pingTag?: string) => boolean
  RegisterCallback: (
    this: Lib,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => undefined
  UnregisterCallback: (
    this: Lib,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => undefined
}

export interface CompatLib {
  cm?: ZoCallbackObjectInstance
  mutePing?: Record<string, number | undefined>
  suppressPing?: Record<string, number | undefined>
  pingState?: Record<string, number | undefined>
  pendingPing?: Record<string, PendingPing | undefined>
  Unload?: (this: CompatLib) => void
  MAP_PING_NOT_SET?: number
  MAP_PING_NOT_SET_PENDING?: number
  MAP_PING_SET_PENDING?: number
  MAP_PING_SET?: number
  SetMapPing?: (this: CompatLib, pingType: number, mapType: number, x: number, y: number) => unknown
  RemoveMapPing?: (this: CompatLib, pingType: number) => undefined
  GetMapPing?: (
    this: CompatLib,
    pingType: number,
    pingTag?: string
  ) => LuaMultiReturn<[number, number]>
  GetMapPingState?: (this: CompatLib, pingType: number, pingTag?: string) => number
  HasMapPing?: (this: CompatLib, pingType: number, pingTag?: string) => boolean
  RefreshMapPin?: (this: CompatLib, pingType: number, pingTag?: string) => boolean
  IsPositionOnMap?: (this: CompatLib, x: number, y: number) => boolean
  MutePing?: (this: CompatLib, pingType: number, pingTag?: string) => undefined
  UnmutePing?: (this: CompatLib, pingType: number, pingTag?: string) => undefined
  IsPingMuted?: (this: CompatLib, pingType: number, pingTag?: string) => undefined
  SuppressPing?: (this: CompatLib, pingType: number, pingTag?: string) => undefined
  UnsuppressPing?: (this: CompatLib, pingType: number, pingTag?: string) => undefined
  IsPingSuppressed?: (this: CompatLib, pingType: number, pingTag?: string) => boolean
  RegisterCallback?: (
    this: CompatLib,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => undefined
  UnregisterCallback?: (
    this: CompatLib,
    eventName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => undefined
}
