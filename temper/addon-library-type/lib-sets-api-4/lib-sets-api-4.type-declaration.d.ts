interface LibSetsApi {
  setInfo: { [setId: number]: { [key: string]: unknown } }
  blacklistedSetIds: { [setId: number]: boolean }
  specialBonusSets: { [setId: number]: unknown }
  setsOfNewerAPIVersion: number[]
  zoneIdsOfNewAPIVersionOnly: number[]
  noSetIdSets: { [setId: number]: { [key: string]: unknown } }
  removeFutureSetData?: (this: void) => void

  LSM?: unknown
  libCustomMenu?: unknown
  libAddonMenu?: unknown
  libSlashCommander?: unknown
  libZone?: unknown
  CheckOptionalLibraries: (this: void) => void
  CheckLSM: (this: void) => boolean

  lookupTableItemSetIdToItemSetCollectionsCategory: { [setId: number]: unknown }

  classSets?: { [setId: number]: { classId?: number; [key: string]: unknown } }

  LangAllowedCheck: (this: void, lang?: string) => string
  GetLocalizedText: (this: void, textName: string, lang?: string, ...args: unknown[]) => string
  GetIndexTableFromNonNumberKeyTable: (
    this: void,
    sourceTable: object,
    useKey?: boolean
  ) => unknown[] | undefined
  SafeStartChatInput: (this: void, text: string, channel?: unknown, target?: string) => void
  GetEquipSlotTexture: (
    this: void,
    equipSlot: number
  ) => LuaMultiReturn<[string | undefined, string, string]>
  GetWeaponTypeText: (this: void, weaponType: number | undefined) => string | undefined
  GetWeaponTypeTexture: (
    this: void,
    weaponType: number
  ) => LuaMultiReturn<[string | undefined, string | undefined, string | undefined]>
  GetArmorTypeTexture: (
    this: void,
    armorType: number
  ) => LuaMultiReturn<[string | undefined, string, string]>
  GetSetTypeTexture: (
    this: void,
    setType: number | undefined,
    setId?: number,
    classId?: number
  ) => string | undefined

  defaultSV: { [key: string]: unknown }
  svData?: { [key: string]: unknown }
  svDebugData?: { [key: string]: unknown }
  LoadSavedVariables: (this: void) => void
  getLibSetsSetPreviewTooltipSavedVariables: (this: void) => unknown

  tooltipSetDataWithoutItemIdsCached: { [setId: number]: unknown }
  CachedSetItemIdsTable: { [setId: number]: { [itemId: number]: number } }
  DecompressSetIdItemIds: (
    this: void,
    setId: number,
    isNonESOSet?: boolean
  ) => { [itemId: number]: number } | undefined

  IsSetCurrentlyActiveWithAPIVersion: (this: void, setId: number | undefined) => boolean

  setItemCollectionZoneId2Category: { [zoneId: number]: number[] }
  setItemCollectionCategory2ZoneId: { [categoryId: number]: number[] }
  setItemCollectionParentCategories: {
    [parentCategoryId: number]: { [categoryId: number]: unknown }
  }
  setItemCollectionCategories: { [categoryId: number]: unknown }

  LoadSets: (this: void) => void

  GetSetItemIdsFiltered: (
    this: void,
    returnSingleItemId: boolean | undefined,
    setId: number | undefined,
    allSetItemIds: { [itemId: number]: number } | undefined,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => LuaMultiReturn<
    [{ [itemId: number]: number } | number | undefined, { [key: string]: unknown } | undefined]
  >

  GetDropMechanicAndDropLocationNames: (
    this: void,
    setId: number | undefined,
    langToUse?: string,
    setData?: { [key: string]: unknown }
  ) => LuaMultiReturn<[unknown, unknown, unknown, unknown]>

  buildItemLink: (this: void, itemId: number, quality?: number) => string | undefined
  IsNoESOSet: (this: void, setId: number) => boolean
  GetSetInfo: (
    this: void,
    setId: number | undefined,
    noItemIds?: boolean,
    lang?: string
  ) => { [key: string]: unknown } | undefined
  GetSetType: (this: void, setId: number) => number | undefined
  GetSetItemIds: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => LuaMultiReturn<
    [{ [itemId: number]: number } | undefined, { [key: string]: unknown } | undefined]
  >
  getNumEquippedItemsByItemIds: (this: void, itemIds: { [itemId: number]: number }) => number
  getDropMechanicName: (
    this: void,
    dropMechanicId: number,
    lang?: string
  ) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetSetEnchantSearchCategories?: (
    this: void,
    setId: number,
    equipType?: number,
    traitType?: number,
    armorType?: number,
    weaponType?: number
  ) => unknown
  DebugGetAllData: (this: void, ...args: unknown[]) => void

  checkIfSetsAreLoadedProperly: (this: void, setId?: number) => boolean
  AreSetsLoaded: (this: void) => boolean
  IsSetsScanning: (this: void) => boolean
  GetCurrentZoneIds: (
    this: void
  ) => LuaMultiReturn<
    [number | undefined, number | undefined, number | undefined, number | undefined]
  >
  IsPublicDungeonZoneId: (this: void, zoneId: number | undefined) => boolean
  CreatePreviewTooltipAndShow?: (this: void, ...args: unknown[]) => unknown
}
