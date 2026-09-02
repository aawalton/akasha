export interface LmpPinData {
  pinTypeString?: string
  filterTooltipCreator?: ((this: void) => string) | undefined
  compassPinTypeString?: string
  onToggleCallback?: (this: void, compassPinType: string | undefined, enabled: boolean) => void
  layoutCallback?: (this: void, pinManager: LmpPinManager) => void
  resizeCallback?:
    | ((this: void, pinManager: LmpPinManager, mapWidth: number, mapHeight: number) => void)
    | undefined
  [key: string]: unknown
}

export interface LmpPinManager {
  customPins: Record<number, LmpPinData | undefined>
  AddCustomPin: (
    this: LmpPinManager,
    pinTypeString: string,
    pinTypeAddCallback: (this: void, pinManager: LmpPinManager) => void,
    pinTypeOnResizeCallback:
      | ((this: void, pinManager: LmpPinManager, mapWidth: number, mapHeight: number) => void)
      | undefined,
    pinLayoutData: object,
    pinTooltipCreator: object | undefined
  ) => void
  CreatePin: (
    this: LmpPinManager,
    pinTypeId: number,
    pinTag: unknown,
    locX: number,
    locY: number,
    areaRadius?: number
  ) => void
  SetCustomPinEnabled: (this: LmpPinManager, pinTypeId: number, enabled: boolean) => void
  RefreshCustomPins: (this: LmpPinManager, pinTypeId?: number) => void
  IsCustomPinEnabled: (this: LmpPinManager, pinTypeId: number) => boolean
  RemovePins: (
    this: LmpPinManager,
    pinTypeString: string,
    pinTypeId: number,
    pinTag: unknown
  ) => void
  FindPin: (
    this: LmpPinManager,
    pinTypeString: string,
    pinTypeId: number,
    pinTag: unknown
  ) => unknown
}

export interface LmpMapPinClass {
  PIN_DATA: Record<number, Record<string, unknown> | undefined>
  PIN_CLICK_HANDLERS: Record<number, Record<number, unknown>>
}

export interface LmpHookPin {
  backgroundControl?: { SetDesaturation: (this: Control, value: number) => void } & Control
}

export interface Filter {
  vars?: Record<string, boolean>
  pveKey?: string
  pvpKey?: string
  imperialPvPKey?: string
  battlegroundKey?: string
  pve?: Control
  pvp?: Control
  imperialPvP?: Control
  battleground?: Control
  [mapGroup: string]: unknown
}

export interface ClickHandler {
  name?: unknown
  gamepadName?: unknown
  [key: string]: unknown
}

export interface GamepadFilterInfo {
  name: string
  onSelect: (this: void, data: GamepadFilterEntryData) => void
  mapPinGroup: number
  showSelectButton: boolean
  narrationText: (this: void, entryData: GamepadFilterEntryData, entryControl: unknown) => unknown
  [key: string]: unknown
}

export interface GamepadFilterEntryData {
  text: string
  currentValue: boolean
  mapPinGroup: number
  [key: string]: unknown
}

export interface Lib {
  name: string
  version: number
  filters: Record<number, Filter | undefined>
  mapGroup: string | undefined
  pinManager: LmpPinManager
  panelToKeyFields_Gamepad?: LuaTable<GamepadFilterPanel, string>
  gamepadPanelsByKey?: Record<string, GamepadFilterPanel>
  show_log: boolean
  loggerName: string
  logger?: DebugLogger

  AddPinType: (
    this: Lib,
    pinTypeString: string,
    pinTypeAddCallback: (this: void, pinManager: LmpPinManager) => void,
    pinTypeOnResizeCallback?:
      | ((this: void, pinManager: LmpPinManager, mapWidth: number, mapHeight: number) => void)
      | undefined,
    pinLayoutData?: Record<string, unknown>,
    pinTooltipCreator?: unknown,
    filterTooltipCreator?: unknown
  ) => number | undefined
  CreatePin: (
    this: Lib,
    pinType: number | string,
    pinTag: unknown,
    locX: number,
    locY: number,
    areaRadius?: number
  ) => void
  GetLayoutData: (this: Lib, pinType: number | string) => Record<string, unknown> | undefined
  GetLayoutKey: (this: Lib, pinType: number | string, key: string) => unknown
  SetLayoutData: (
    this: Lib,
    pinType: number | string,
    pinLayoutData: Record<string, unknown>
  ) => void
  SetLayoutKey: (this: Lib, pinType: number | string, key: string, data: unknown) => void
  SetFilterTooltipCreator: (
    this: Lib,
    pinType: number | string,
    filterTooltipCreator: unknown
  ) => void
  SetClickHandlers: (
    this: Lib,
    pinType: number | string,
    lmbHandler: ClickHandler | undefined,
    rmbHandler: ClickHandler | undefined
  ) => void
  RefreshPins: (this: Lib, pinType?: number | string) => void
  RemoveCustomPin: (this: Lib, pinType: number | string, pinTag?: unknown) => void
  FindCustomPin: (this: Lib, pinType: number | string, pinTag: unknown) => unknown
  SetAddCallback: (
    this: Lib,
    pinType: number | string,
    pinTypeAddCallback: (this: void, pinManager: LmpPinManager) => void
  ) => void
  SetResizeCallback: (
    this: Lib,
    pinType: number | string,
    pinTypeOnResizeCallback: (
      this: void,
      pinManager: LmpPinManager,
      mapWidth: number,
      mapHeight: number
    ) => void
  ) => void
  IsEnabled: (this: Lib, pinType: number | string) => boolean | undefined
  SetEnabled: (this: Lib, pinType: number | string, state: unknown) => void
  Enable: (this: Lib, pinType: number | string) => void
  Disable: (this: Lib, pinType: number | string) => void
  AddPinFilter: (
    this: Lib,
    pinType: number | string,
    pinCheckboxText?: string,
    separate?: boolean,
    savedVars?: Record<string, boolean>,
    savedVarsPveKey?: string,
    savedVarsPvpKey?: string,
    savedVarsImperialPvpKey?: string,
    savedVarsBattlegroundKey?: string
  ) =>
    | LuaMultiReturn<
        [
          pve: Control | undefined,
          pvp: Control | undefined,
          imperial: Control | undefined,
          bg: Control | undefined,
        ]
      >
    | undefined
  SetPinFilterHidden: (
    this: Lib,
    pinType: number | string,
    mapGroup: string,
    hidden: boolean
  ) => void
  GetZoneAndSubzone: (
    this: Lib,
    alternative?: boolean,
    bStripUIMap?: boolean,
    bKeepMapNum?: boolean
  ) => string | LuaMultiReturn<string[]>
  MyPosition: (
    this: Lib
  ) => LuaMultiReturn<[x: number, y: number, zone: string, subzone: string, mapName: string]>
  dm: (this: Lib, logType: string, ...args: unknown[]) => void

  OnMapChanged: (this: void) => void
}
