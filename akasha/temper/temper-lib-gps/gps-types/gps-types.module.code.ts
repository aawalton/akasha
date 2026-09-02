export type SetMapResultFn = (this: void, ...args: unknown[]) => number

export type GlobalFnTable = Record<string, SetMapResultFn | undefined>

export type GlobalObjectTable = Record<string, unknown>

export interface MeasurementMethods {
  Initialize: (this: MeasurementInstance) => undefined
  GetId: (this: MeasurementInstance) => number
  SetId: (this: MeasurementInstance, id: number) => undefined
  SetMapIndex: (this: MeasurementInstance, mapIndex: number) => undefined
  GetMapIndex: (this: MeasurementInstance) => number
  SetZoneId: (this: MeasurementInstance, zoneId: number) => undefined
  GetZoneId: (this: MeasurementInstance) => number
  SetScale: (this: MeasurementInstance, scaleX: number, scaleY: number) => undefined
  GetScale: (this: MeasurementInstance) => LuaMultiReturn<[number, number]>
  SetOffset: (this: MeasurementInstance, offsetX: number, offsetY: number) => undefined
  GetOffset: (this: MeasurementInstance) => LuaMultiReturn<[number, number]>
  IsValid: (this: MeasurementInstance) => boolean
  ToGlobal: (this: MeasurementInstance, x: number, y: number) => LuaMultiReturn<[number, number]>
  ToWorld: (
    this: MeasurementInstance,
    x: number,
    y: number
  ) => LuaMultiReturn<[number, number, number]>
  ToLocal: (this: MeasurementInstance, x: number, y: number) => LuaMultiReturn<[number, number]>
  GetCenter: (this: MeasurementInstance) => LuaMultiReturn<[number, number]>
  Contains: (this: MeasurementInstance, x: number, y: number) => boolean
  GetName: (this: MeasurementInstance) => string
  GetParentZoneId: (this: MeasurementInstance) => number
  Serialize: (this: MeasurementInstance) => string
  Deserialize: (this: MeasurementInstance, id: number, data: string) => undefined
}

export interface MeasurementInstance extends MeasurementMethods {
  id: number
  mapIndex: number
  zoneId: number
  scaleX: number
  scaleY: number
  offsetX: number
  offsetY: number
}

export interface MeasurementClass extends MeasurementMethods {
  New: (this: MeasurementClass) => MeasurementInstance
}

export interface WorldSizeMethods {
  Initialize: (this: WorldSizeInstance) => undefined
  GetId: (this: WorldSizeInstance) => number
  GetMapId: (this: WorldSizeInstance) => number
  SetMapId: (this: WorldSizeInstance, id: number) => undefined
  SetZoneId: (this: WorldSizeInstance, zoneId: number) => undefined
  GetZoneId: (this: WorldSizeInstance) => number
  SetSize: (this: WorldSizeInstance, width: number, height: number) => undefined
  GetSize: (this: WorldSizeInstance) => LuaMultiReturn<[number, number]>
  IsValid: (this: WorldSizeInstance) => boolean
  GetName: (this: WorldSizeInstance) => string
  Serialize: (this: WorldSizeInstance) => string
  Deserialize: (this: WorldSizeInstance, data: string) => undefined
}

export interface WorldSizeInstance extends WorldSizeMethods {
  id: number
  zoneId: number
  width: number
  height: number
}

export interface WorldSizeClass extends WorldSizeMethods {
  New: (this: WorldSizeClass) => WorldSizeInstance
}

export type MapStackEntry = [mapId: number, zoom: number, offsetX: number, offsetY: number]

export interface MapStackMethods {
  Initialize: (
    this: MapStackInstance,
    meter: TamrielOMeterInstance,
    adapter: MapAdapterInstance
  ) => undefined
  Push: (this: MapStackInstance) => undefined
  Pop: (this: MapStackInstance) => number
}

export interface MapStackInstance extends MapStackMethods {
  meter: TamrielOMeterInstance
  adapter: MapAdapterInstance
  stack: MapStackEntry[]
}

export interface MapStackClass extends MapStackMethods {
  New: (
    this: MapStackClass,
    meter: TamrielOMeterInstance,
    adapter: MapAdapterInstance
  ) => MapStackInstance
}

export interface MapAdapterMethods {
  Initialize: (this: MapAdapterInstance) => undefined
  HookSetMapToFunction: (
    this: MapAdapterInstance,
    funcName: string,
    returnToInitialMap?: boolean,
    skipSecondCall?: boolean
  ) => undefined
  SetPlayerChoseCurrentMap: (this: MapAdapterInstance) => undefined
  SetCurrentZoom: (this: MapAdapterInstance, zoom: number) => unknown
  GetCurrentZoom: (this: MapAdapterInstance) => number
  SetCurrentOffset: (this: MapAdapterInstance, offsetX: number, offsetY: number) => unknown
  GetCurrentOffset: (this: MapAdapterInstance) => LuaMultiReturn<[number, number]>
  GetPlayerPosition: (
    this: MapAdapterInstance
  ) => LuaMultiReturn<[number, number, number, boolean, boolean]>
  GetPlayerWorldPosition: (
    this: MapAdapterInstance
  ) => LuaMultiReturn<[number, number, number, number]>
  GetNormalizedPositionFromWorld: (
    this: MapAdapterInstance,
    zoneId: number,
    worldX: number,
    worldY: number,
    worldZ: number
  ) => LuaMultiReturn<[number, number]>
  GetPlayerZoneId: (this: MapAdapterInstance) => number
  GetCurrentMapIndex: (this: MapAdapterInstance) => number
  GetCurrentZoneId: (this: MapAdapterInstance) => number
  GetCurrentMapIdentifier: (this: MapAdapterInstance) => number
  GetMapFloorInfo: (this: MapAdapterInstance) => LuaMultiReturn<[number, number]>
  IsCurrentMapPlayerLocation: (this: MapAdapterInstance) => boolean
  GetFormattedMapName: (this: MapAdapterInstance, mapIndex: number) => string
  IsCurrentMapZoneMap: (this: MapAdapterInstance) => boolean
  IsCurrentMapCosmicMap: (this: MapAdapterInstance) => boolean
  MapZoomOut: (this: MapAdapterInstance) => unknown
  SetMapToMapListIndexWithoutMeasuring: (this: MapAdapterInstance, mapIndex: number) => number
  ProcessMapClickWithoutMeasuring: (this: MapAdapterInstance, x: number, y: number) => number
  SetMapToMapIdWithoutMeasuring: (this: MapAdapterInstance, mapId: number) => number
  GetUniversallyNormalizedMapInfo: (
    this: MapAdapterInstance,
    mapId?: number
  ) => LuaMultiReturn<[number, number, number, number]>
  GetWorldSize: (this: MapAdapterInstance, sizeId: number | string) => WorldSizeInstance
  SetWorldSize: (
    this: MapAdapterInstance,
    sizeId: number | string,
    size: WorldSizeInstance,
    notSaving?: boolean
  ) => undefined
}

export interface MapAdapterInstance extends MapAdapterMethods {
  anchor: ZoAnchor
  panAndZoom: WorldMapPanAndZoom
  sizeIdWorldSize: Record<string | number, WorldSizeInstance | undefined>
  original: GlobalFnTable
}

export interface MapAdapterClass extends MapAdapterMethods {
  New: (this: MapAdapterClass) => MapAdapterInstance
}

export interface TamrielOMeterMethods {
  Initialize: (this: TamrielOMeterInstance, adapter: MapAdapterInstance) => undefined
  Reset: (this: TamrielOMeterInstance) => undefined
  RegisterRootMap: (this: TamrielOMeterInstance, mapIndex: number | undefined) => undefined
  GetRootMapMeasurement: (
    this: TamrielOMeterInstance,
    mapIndex: number
  ) => MeasurementInstance | false | undefined
  GetMeasurement: (this: TamrielOMeterInstance, id: number) => MeasurementInstance | undefined
  SetMeasurement: (
    this: TamrielOMeterInstance,
    measurement: MeasurementInstance,
    isRootMap: boolean
  ) => undefined
  SetMeasuring: (this: TamrielOMeterInstance, measuring: boolean) => undefined
  IsMeasuring: (this: TamrielOMeterInstance) => boolean
  ClearCurrentMapMeasurement: (this: TamrielOMeterInstance) => undefined
  GetCurrentMapMeasurement: (this: TamrielOMeterInstance) => MeasurementInstance | undefined
  GetMapMeasurementByMapId: (
    this: TamrielOMeterInstance,
    mapId: number
  ) => MeasurementInstance | undefined
  TryCalculateRootMapMeasurement: (
    this: TamrielOMeterInstance,
    rootMapIndex: number
  ) => MeasurementInstance | undefined
  CalculateMapMeasurement: (
    this: TamrielOMeterInstance,
    mapId?: number | boolean
  ) => LuaMultiReturn<[boolean, number]>
  FindRootMapMeasurementForCoordinates: (
    this: TamrielOMeterInstance,
    x: number,
    y: number
  ) => MeasurementInstance | undefined
  PushCurrentMap: (this: TamrielOMeterInstance) => undefined
  PopCurrentMap: (this: TamrielOMeterInstance) => number
  GetCurrentWorldSize: (this: TamrielOMeterInstance) => WorldSizeInstance
  GetLocalDistanceInMeters: (
    this: TamrielOMeterInstance,
    lx1: number,
    ly1: number,
    lx2: number,
    ly2: number
  ) => number
  GetGlobalDistanceInMeters: (
    this: TamrielOMeterInstance,
    gx1: number,
    gy1: number,
    gx2: number,
    gy2: number
  ) => number
  GetWorldGlobalRatio: (this: TamrielOMeterInstance) => LuaMultiReturn<[number, number]>
  GetGlobalWorldRatio: (this: TamrielOMeterInstance) => LuaMultiReturn<[number, number]>
}

export interface TamrielOMeterInstance extends TamrielOMeterMethods {
  adapter: MapAdapterInstance
  mapStack: MapStackInstance
  measurements: Record<number, MeasurementInstance | undefined>
  savedMeasurements: Record<number, MeasurementInstance | undefined>
  rootMaps: Record<number, MeasurementInstance | false | undefined>
  measuring: boolean
}

export interface TamrielOMeterClass extends TamrielOMeterMethods {
  New: (this: TamrielOMeterClass, adapter: MapAdapterInstance) => TamrielOMeterInstance
}

export interface InternalState {
  logger: DebugLogger
  chat: LibChatMessageProxy
  TAMRIEL_MAP_INDEX: number
  BLACKREACH_ROOT_MAP_INDEX: number
  mapAdapter?: MapAdapterInstance
  meter?: TamrielOMeterInstance
}

export interface Lib {
  internal: InternalState
  LIB_EVENT_STATE_CHANGED: string
  IsReady: (this: Lib) => boolean
  IsMeasuring: (this: Lib) => boolean
  ClearMapMeasurements: (this: Lib) => undefined
  ClearCurrentMapMeasurement: (this: Lib) => undefined
  GetCurrentMapMeasurement: (this: Lib) => MeasurementInstance | undefined
  GetMapMeasurementByMapId: (this: Lib, mapId: number) => MeasurementInstance | undefined
  GetCurrentMapParentZoneIndices: (this: Lib) => LuaMultiReturn<[number, number, number]>
  CalculateMapMeasurement: (
    this: Lib,
    returnToInitialMap?: boolean
  ) => LuaMultiReturn<[boolean, number]>
  LocalToGlobal: (this: Lib, x: number, y: number) => LuaMultiReturn<[number, number]> | undefined
  GlobalToLocal: (this: Lib, x: number, y: number) => LuaMultiReturn<[number, number]> | undefined
  LocalToWorld: (
    this: Lib,
    x: number,
    y: number
  ) => LuaMultiReturn<[number, number, number]> | undefined
  GlobalToWorld: (
    this: Lib,
    x: number,
    y: number
  ) => LuaMultiReturn<[number, number, number]> | undefined
  SetPlayerChoseCurrentMap: (this: Lib) => undefined
  SetMapToRootMap: (this: Lib, x: number, y: number) => number
  MapZoomInMax: (this: Lib, x: number, y: number) => number
  PushCurrentMap: (this: Lib) => undefined
  PopCurrentMap: (this: Lib) => number
  GetCurrentWorldSize: (this: Lib) => LuaMultiReturn<[number, number]>
  GetLocalDistanceInMeters: (
    this: Lib,
    lx1: number,
    ly1: number,
    lx2: number,
    ly2: number
  ) => number
  GetGlobalDistanceInMeters: (
    this: Lib,
    gx1: number,
    gy1: number,
    gx2: number,
    gy2: number
  ) => number
  GetWorldGlobalRatio: (this: Lib) => LuaMultiReturn<[number, number]>
  GetGlobalWorldRatio: (this: Lib) => LuaMultiReturn<[number, number]>
}

export interface CompatLib {
  LIB_EVENT_STATE_CHANGED?: string
  Unload?: (this: CompatLib) => void
  suppressCount?: number
  [key: string]: unknown
}
