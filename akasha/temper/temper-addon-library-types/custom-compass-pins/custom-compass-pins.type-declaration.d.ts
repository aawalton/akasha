declare var CUSTOM_COMPASS_LAYOUT_UPDATE: "update"
declare var CUSTOM_COMPASS_LAYOUT_RESET: "reset"

interface CompassPin extends Control {
  pinTag?: unknown
}

interface CompassPinAdditionalLayout {
  update?: (
    this: void,
    pin: CompassPin,
    angle: number,
    normalizedAngle: number,
    normalizedDistance: number
  ) => void
  reset?: (this: void, pin: CompassPin) => void
}

interface CompassPinLayout {
  maxDistance?: number
  texture?: string
  size?: number
  level?: number
  tint?: unknown
  sizeCallback?: (
    this: void,
    pin: CompassPin,
    angle: number,
    normalizedAngle: number,
    normalizedDistance: number
  ) => void
  additionalLayout?: CompassPinAdditionalLayout
  mapPinTypeString?: string
  onToggleCallback?: (this: void, compassPinType: string, enabled: boolean) => void
}

interface CompassPinManager {
  CreatePin: (
    pinType: string,
    pinTag: unknown,
    xLoc: number,
    yLoc: number,
    pinName?: string
  ) => void
  RemovePins: (this: CompassPinManager, pinType: string) => void
}

interface CustomCompassPins {
  pinManager: CompassPinManager
  pinLayouts: Record<string, CompassPinLayout>
  AddCustomPin: (
    pinType: string,
    pinCallback: (this: void, pinManager: CompassPinManager) => void,
    layout: CompassPinLayout,
    savedVarTable?: Record<string, boolean>
  ) => void
  RefreshPins: (pinType?: number | string) => void
  SetCompassPinEnabled: (pinType: string, enabled: boolean) => void
}

declare var COMPASS_PINS: CustomCompassPins
