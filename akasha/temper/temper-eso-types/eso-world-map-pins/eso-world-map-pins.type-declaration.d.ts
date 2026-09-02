interface WorldMapPinManager {
  CreatePin: (
    this: WorldMapPinManager,
    pinType: number | string,
    pinTag: unknown,
    locX: number,
    locY: number,
    areaRadius?: number
  ) => void
  IsCustomPinEnabled: (this: WorldMapPinManager, pinTypeId: number) => boolean
  SetCustomPinEnabled: (this: WorldMapPinManager, pinTypeId: number, enabled: boolean) => void
  RefreshCustomPins: (this: WorldMapPinManager, pinTypeId: number) => void
  RemovePins: (this: WorldMapPinManager, pinType: string) => void
}

interface WorldMapCustomPinLayout {
  level?: number
  texture?: string | ((this: void, pin: unknown) => string)
  size?: number
  tint?: unknown
  [key: string]: unknown
}

declare function ZO_WorldMap_GetPinManager(this: void): WorldMapPinManager

declare const ZO_WorldMap_AddCustomPin: (
  this: void,
  pinTypeString: string,
  pinTypeAddCallback: (this: void) => void,
  pinTypeOnResizeCallback:
    | ((this: void, pinManager: WorldMapPinManager, mapWidth: number, mapHeight: number) => void)
    | undefined,
  pinLayoutData: object,
  pinTooltipCreator?:
    | ((this: void, pin: unknown, ...rest: unknown[]) => void)
    | { tooltip: number; creator: (this: void, ...args: never[]) => void }
    | undefined
) => void

declare const ZO_WorldMap_RefreshCustomPinsOfType: (this: void, pinTypeId?: number) => void

declare const ZO_WorldMap_SetCustomPinEnabled: (
  this: void,
  pinTypeId: number,
  enabled: boolean
) => void

interface ZoMapPinClass {
  PIN_DATA: Record<number, { size: number } | undefined>
}

interface InventorySlotData {
  itemType: number
  slotIndex: number
  name: string
  stackCount: number
  iconFile: string
}

interface SharedInventoryManager {
  GenerateFullSlotData: (
    this: SharedInventoryManager,
    filterFunction: unknown,
    ...bagIds: number[]
  ) => InventorySlotData[]
  RegisterCallback: (
    this: SharedInventoryManager,
    event: string,
    callback: (...args: never[]) => void
  ) => void
  UnregisterCallback: (
    this: SharedInventoryManager,
    event: string,
    callback?: (...args: never[]) => void
  ) => void
}
declare const SHARED_INVENTORY: SharedInventoryManager

declare const WORLD_MAP_SCENE: {
  RegisterCallback: (event: string, callback: (...args: never[]) => void) => void
  UnregisterCallback: (event: string, callback?: (...args: never[]) => void) => void
  AddFragment: (fragment: SceneFragment) => void
}
