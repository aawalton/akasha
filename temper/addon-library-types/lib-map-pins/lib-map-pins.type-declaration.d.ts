interface MapPin {
  GetPinTypeAndTag: () => LuaMultiReturn<[pinTypeId: number, pinTag: unknown]>
  m_PinTag: unknown
  normalizedX: number
  normalizedY: number
}

interface MapPinClickAction {
  name: string | ((this: void, pin: MapPin) => string)
  gamepadName?: string
  show?: (this: void, pin: MapPin) => boolean
  duplicates?: (this: void, pin1: MapPin, pin2: MapPin) => boolean
  callback: (this: void, pin: MapPin) => void
}

interface MapPinTooltipCreator {
  creator: (this: void, pin: MapPin) => void
  tooltip?: number
}

interface MapPinLayoutData {
  level?: number
  texture?: string | ((this: void, pin: MapPin) => string)
  size?: number
  tint?: unknown
  maxDistance?: number
  additionalLayout?: CompassPinAdditionalLayout
  mapPinTypeString?: string
  onToggleCallback?: (this: void, compassPinType: string, enabled: boolean) => void
}

interface LibMapPins {
  AddPinType: (
    pinTypeString: string,
    pinTypeAddCallback: (this: void, pinManager: unknown) => void,
    pinTypeOnResizeCallback:
      | ((this: void, pinManager: unknown, mapWidth: number, mapHeight: number) => void)
      | undefined,
    pinLayoutData?: MapPinLayoutData,
    pinTooltipCreator?: MapPinTooltipCreator | string
  ) => number
  CreatePin: (
    pinType: number | string,
    pinTag: unknown,
    locX: number,
    locY: number,
    areaRadius?: number
  ) => void
  RefreshPins: (pinType?: number | string) => void
  IsEnabled: (pinType: number | string) => boolean
  SetEnabled: (pinType: number | string, state: boolean) => void
  SetPinFilterHidden: (pinType: number | string, mapGroup: number, hidden: boolean) => void
  SetLayoutKey: (pinType: number | string, key: string, data: unknown) => void
  SetClickHandlers: (pinType: number | string, handler: Record<number, MapPinClickAction>) => void
  AddPinFilter: (
    pinType: number | string,
    pinCheckboxText?: string,
    separate?: boolean,
    savedVars?: Record<string, boolean>,
    savedVarsPveKey?: string,
    savedVarsPvpKey?: string,
    savedVarsImperialPvpKey?: string,
    savedVarsBattlegroundKey?: string
  ) => void
  GetZoneAndSubzone: (
    alternative: boolean,
    bStripUIMap: boolean,
    bKeepMapNum: boolean
  ) => LuaMultiReturn<[zone: string, subzone: string]>
}

declare const LibMapPins: LibMapPins

declare const LIBMAPPINS_BATTLEGROUND_MAPGROUP: number
