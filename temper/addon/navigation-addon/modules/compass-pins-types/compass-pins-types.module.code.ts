export type PinKey = number

export type CompassLayoutUpdateFn = (
  this: void,
  pin: CompassPin,
  angle: number,
  normalizedAngle: number,
  normalizedDistance: number
) => void

export type CompassLayoutResetFn = (this: void, pin: CompassPin) => void

export type PinCallback = (this: void, pinManager: CompassPinManagerInstance) => void

export interface CompassPinAdditionalLayout {
  update?: CompassLayoutUpdateFn
  reset?: CompassLayoutResetFn
  [legacyIndex: number]: CompassLayoutUpdateFn | CompassLayoutResetFn | undefined
}

export interface CompassPinLayout {
  maxDistance?: number
  texture?: string
  FOV?: number
  maxAngle?: number
  size?: number
  level?: number
  tint?: unknown
  sizeCallback?: CompassLayoutUpdateFn
  additionalLayout?: CompassPinAdditionalLayout
  mapPinTypeString?: string
  onToggleCallback?: (this: void, compassPinType: string, enabled: boolean) => void
}

export interface CompassPin extends Control {
  xLoc?: number
  yLoc?: number
  pinType?: string
  pinTag?: unknown
  pinName?: string
  data?: CompassPinData
}

export interface CompassPinData {
  xLoc: number
  yLoc: number
  pinType: string
  pinTag: unknown
  pinName?: string
  pinKey?: PinKey
  [vararg: number]: unknown
}

export interface CompassPinManagerMethods {
  Initialize2: (this: CompassPinManagerInstance) => undefined
  GetNewPin: (
    this: CompassPinManagerInstance,
    data: CompassPinData
  ) => LuaMultiReturn<[CompassPin, PinKey]>
  SetCompassPinEnabled: (
    this: CompassPinManagerInstance,
    pinType: string,
    state: boolean
  ) => undefined
  IsCompassPinEnabled: (this: CompassPinManagerInstance, pinType: string) => boolean
  CreatePin: (
    this: CompassPinManagerInstance,
    pinType: string,
    pinTag: unknown,
    xLoc: number,
    yLoc: number,
    pinName?: string,
    ...rest: unknown[]
  ) => undefined
  RemovePin: (this: CompassPinManagerInstance, pinTag: unknown) => undefined
  RemovePins: (this: CompassPinManagerInstance, pinType?: string) => undefined
  ResetPin: (this: CompassPinManagerInstance, pin: CompassPin) => undefined
  Update: (this: CompassPinManagerInstance, x: number, y: number, heading: number) => undefined
  UpdateSinglePin: (
    this: CompassPinManagerInstance,
    pinData: CompassPinData,
    x: number,
    y: number,
    heading: number
  ) => undefined
}

export interface CompassPoolInstance {
  AcquireObject: <T extends Control = Control>(
    this: CompassPoolInstance
  ) => LuaMultiReturn<[T, number]>
  GetActiveObject: <T extends Control = Control>(
    this: CompassPoolInstance,
    key: number
  ) => T | undefined
  ReleaseObject: (this: CompassPoolInstance, key: number) => undefined
  ReleaseAllObjects: (this: CompassPoolInstance) => undefined
}

export interface CompassPoolClass {
  Subclass: <T = CompassPoolClass>(this: CompassPoolClass) => T
  New: <T = CompassPoolInstance>(
    this: void,
    self: object,
    templateName: string,
    parent: Control,
    namePrefix: string
  ) => T
}

export interface CompassPinManagerInstance extends CompassPoolInstance, CompassPinManagerMethods {
  pinData: LuaTable<AnyNotNil, CompassPinData>
  defaultAngle: number
  compassPinEnabled: Record<string, boolean>
}

export interface CompassPinManagerClass extends CompassPinManagerMethods {
  New: (this: CompassPinManagerClass) => CompassPinManagerInstance
}

export interface Lib {
  name: string
  version: number
  control: CompassPin
  pinManager: CompassPinManagerInstance
  pinCallbacks: LuaTable<AnyNotNil, PinCallback>
  pinLayouts: LuaTable<AnyNotNil, CompassPinLayout>
  map?: string

  New: (this: Lib) => Lib
  SetupCallbacks: (this: Lib) => undefined
  AddCustomPin: (
    this: Lib,
    pinType: string,
    pinCallback: PinCallback,
    layout: CompassPinLayout,
    savedVarTable?: Record<string, boolean>
  ) => undefined
  RefreshPins: (this: Lib, pinType?: number | string) => undefined
  GetDistanceCoefficient: (this: Lib) => number
  RefreshDistanceCoefficient: (this: Lib) => undefined
  Update: (this: Lib) => undefined
  SetCompassPinEnabled: (this: Lib, pinType: string, state: boolean) => undefined
  IsCompassPinEnabled: (this: Lib, pinType: string) => boolean
  CreatePin: (
    this: Lib,
    pinType: string,
    pinTag: unknown,
    xLoc: number,
    yLoc: number,
    pinName?: string,
    ...rest: unknown[]
  ) => undefined
  RemovePin: (this: Lib, pinTag: unknown) => undefined
  RemovePins: (this: Lib, pinType?: string) => undefined
  ResetPin: (this: Lib, pin: CompassPin) => undefined
}
