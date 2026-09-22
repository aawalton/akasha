interface SetsApi {
  name: string
  prefix: string
  version: number
  author: string
  svName: string
  svDebugName: string
  svVersion: number
  setsLoaded: boolean
  setsScanning: boolean
  fullyLoaded: boolean
  startedLoading: boolean
  IsConsole: boolean
  checkIfPTSAPIVersionIsLive: (this: void) => boolean
  APIVersions: { [key: string]: number }
  setDataPreloaded: { [tableKey: string]: unknown }
  setIds: { [setId: number]: boolean }
  nonExistingSetIdsAtCurrentApiVersion: { [setId: number]: boolean }
}

interface SetsApi {
  openMapOfZoneId: (
    this: void,
    zoneId: number | undefined,
    isParentZoneId?: boolean
  ) => boolean | undefined
  showWayshrineNodeIdOnMap: (this: void, wayshrineNodeId: number | undefined) => boolean | undefined

  IsCraftedSet: (this: void, setId: number | undefined) => boolean | undefined
  IsMonsterSet: (this: void, setId: number | undefined) => boolean | undefined
  IsDungeonSet: (this: void, setId: number | undefined) => boolean | undefined
  IsTrialSet: (
    this: void,
    setId: number | undefined
  ) => LuaMultiReturn<[boolean | undefined, boolean | undefined]>
  IsArenaSet: (this: void, setId: number | undefined) => boolean | undefined
  IsOverlandSet: (this: void, setId: number | undefined) => boolean | undefined
  IsCyrodiilSet: (this: void, setId: number | undefined) => boolean | undefined
  IsBattlegroundSet: (this: void, setId: number | undefined) => boolean | undefined
  IsImperialCitySet: (this: void, setId: number | undefined) => boolean | undefined
  IsSpecialSet: (this: void, setId: number | undefined) => boolean | undefined
  IsDailyRandomDungeonAndImperialCityRewardSet: (
    this: void,
    setId: number | undefined
  ) => boolean | undefined
  IsMythicSet: (this: void, setId: number | undefined) => boolean | undefined
  IsClassSet: (this: void, setId: number | undefined, classId?: number) => boolean | undefined

  IsDungeonZoneId: (this: void, zoneId: number | undefined) => boolean | undefined
  IsDungeonZoneIdTrial: (this: void, zoneId: number | undefined) => boolean | undefined
}

interface SetsApi {
  IsAPerfectedOrNonPerfectedSetId: (this: void, setId: number) => boolean
  IsPerfectedSet: (this: void, setId: number | undefined) => boolean | undefined
  IsNonPerfectedSet: (this: void, setId: number | undefined) => boolean | undefined
  GetPerfectedSetId: (
    this: void,
    perfectedSetId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetPerfectedSetInfo: (
    this: void,
    setId: number | undefined
  ) => { [k: string]: unknown } | undefined
  GetAllPerfectedSetIds: (this: void) => unknown
  GetAllNonPerfectedSetIds: (this: void) => unknown
  IsSetByItemId: (
    this: void,
    itemId: number | undefined
  ) => LuaMultiReturn<
    [
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ]
  >
  IsSetByItemLink: (
    this: void,
    itemLink: string | undefined
  ) => LuaMultiReturn<
    [
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ]
  >
  IsVeteranSet: (
    this: void,
    setId: number | undefined,
    itemLink: string | undefined
  ) => boolean | undefined
}

interface SetsApi {
  IsArmorTypeSet: (
    this: void,
    setId: number | undefined,
    armorType: number | undefined
  ) => boolean | undefined
  IsLightArmorSet: (this: void, setId: number | undefined) => boolean
  IsMediumArmorSet: (this: void, setId: number | undefined) => boolean
  IsHeavyArmorSet: (this: void, setId: number | undefined) => boolean
  IsAllArmorSet: (this: void, setId: number | undefined) => boolean
  IsArmorSet: (this: void, setId: number | undefined) => boolean
  IsJewelrySet: (this: void, setId: number | undefined) => boolean
  IsWeaponSet: (this: void, setId: number | undefined) => boolean
  IsWeaponTypeSet: (
    this: void,
    setId: number | undefined,
    weaponType: number | undefined
  ) => boolean
  IsEquipTypeSet: (this: void, setId: number | undefined, equipType: number | undefined) => boolean

  GetAllArmorTypeSets: (this: void, armorType: number | undefined) => unknown
  GetAllArmorSets: (this: void) => unknown
  GetAllJewelrySets: (this: void) => unknown
  GetAllWeaponSets: (this: void) => unknown
  GetAllWeaponTypeSets: (this: void, weaponType: number | undefined) => unknown
  GetAllEquipTypeSets: (this: void, equipType: number | undefined) => unknown
}
interface SetsApi {
  GetWayshrineIds: (
    this: void,
    setId: number | undefined,
    withRelatedZoneIds?: boolean
  ) => LuaMultiReturn<[unknown, { [wayshrineNodeId: number]: number | undefined } | undefined]>
  GetWayshrinesZoneId: (this: void, wayshrineNodeId: number | undefined) => number | undefined
  GetZoneIds: (this: void, setId: number | undefined) => unknown

  GetDLCId: (this: void, setId: number | undefined) => unknown
  IsCurrentDLC: (this: void, setId: number | undefined) => boolean | undefined
  GetAllDLCIds: (this: void) => unknown
  GetDLCType: (this: void, setId: number | undefined) => number | undefined
  GetDLCTypeName: (this: void, dlcTypeId: number | undefined) => string | undefined
  GetAllDLCTypes: (this: void) => unknown

  GetTraitsNeeded: (this: void, setId: number | undefined) => unknown

  GetSetTypeName: (this: void, setsSetType: number | undefined, lang?: string) => string | undefined
  GetAllSetTypes: (this: void) => unknown
}

interface SetsApi {
  GetDropMechanicName: (
    this: void,
    setsDropMechanicId: number | undefined,
    lang?: string
  ) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetDropMechanic: (
    this: void,
    setId: number | undefined,
    withNames?: boolean,
    lang?: string
  ) => LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown]>
  GetAllDropMechanics: (this: void) => unknown

  GetDropZonesBySetId: (this: void, setId: number | undefined) => unknown
  GetSetIdsByDropZone: (this: void, zoneId: number | undefined) => unknown
  GetSetIdsOfCurrentZone: (
    this: void
  ) => LuaMultiReturn<[unknown, number | undefined, number | undefined]>

  GetDropLocationNamesBySetId: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetIdsByDropLocationName: (
    this: void,
    dropLocationName: string | undefined,
    lang?: string
  ) => unknown

  GetAllSetIds: (this: void) => unknown
  GetAllSetItemIds: (this: void) => unknown
}

interface SetsApi {
  GetSetItemId: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => number | undefined
  GetSetFirstItemId: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => number | undefined

  GetSetName: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetNames: (this: void, setId: number | undefined) => unknown
  GetAllSetNames: (this: void) => unknown

  GetSetArmorTypes: (this: void, setId: number | undefined) => unknown
  GetArmorTypeName: (this: void, armorType: number | undefined) => string | undefined
  GetItemsArmorType: (this: void, itemId: number | undefined) => number | undefined

  GetSetWeaponTypes: (
    this: void,
    setId: number | undefined
  ) => { [setId: number]: boolean | undefined } | undefined
  GetItemsWeaponType: (this: void, itemId: number | undefined) => number | undefined

  GetNumEquippedItemsByItemIds: (
    this: void,
    setsItemIds: { [itemId: number]: unknown } | undefined
  ) => number
  GetNumEquippedItemsBySetId: (
    this: void,
    setId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>
  GetNumEquippedItemsByItemId: (
    this: void,
    itemId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>

  GetSetEquipTypes: (
    this: void,
    setId: number | undefined
  ) => { [setId: number]: boolean | undefined } | undefined

  GetSetByName: (
    this: void,
    setName: string | undefined,
    lang?: string
  ) => LuaMultiReturn<[number | undefined, unknown]>
  GetSetBonuses: (this: void, itemLink: string, numBonuses: number) => (string | undefined)[]

  GetClassSets: (this: void, classId: number | undefined) => unknown
  GetAllClassSets: (this: void) => unknown

  JumpToSetId: (this: void, setId: number | undefined, factionIndex?: number) => boolean | undefined

  RegisterCustomSetSearchResultsListContextMenu: (
    this: void,
    addonName: string | undefined,
    headerName: string | undefined,
    submenuName: string | undefined,
    submenuEntries: object | undefined,
    visibleFunc: ((this: void, ...args: unknown[]) => unknown) | undefined
  ) => void
  GetSetSearchFavoriteCategories: (this: void) => {
    category: string
    categoryName: unknown
    texture: string
  }[]
  GetSetSearchFavoriteCategoryData: (
    this: void,
    category: string | undefined
  ) =>
    | {
        category: string
        categoryName: unknown
        texture: string
      }
    | undefined
  GetSetSearchFavoritesCategoriesForSetId: (
    this: void,
    setId: number | undefined
  ) =>
    | (
        | {
            category: string
            categoryName: unknown
            texture: string
          }
        | undefined
      )[]
    | undefined
}
interface SetsApi {
  customTooltipHooks: {
    needed: { [ctrlName: string]: unknown }
    hooked: { [ctrlName: string]: unknown }
    eventPlayerActivatedCalled: boolean
  }
  customContextMenuEntries: { [key: string]: unknown }

  lastSetsPreloadedCheckAPIVersion: number
  debugNumItemIdPackages: number
  debugNumItemIdPackageSize: number
  debugMaxCollectibleIds: number

  fallbackLang: string
  supportedLanguages: { [lang: string]: boolean }
  nonOfficialLanguages: { [lang: string]: boolean }
  numSupportedLangs: number
  numSupportedLangsForDebug: number
  supportedLanguagesIndex: string[]
  supportedLanguageChoices: string[]
  supportedLanguageChoicesValues: number[]
  supportedLanguageChoicesTooltips: string[]
  clientLang: string

  allowedSetTypes: { [setType: number]: boolean }
  setTypeToLibraryInternalVariableNames: {
    [setType: number]: { [tableKey: string]: string }
  }
  counterSuffix: string
  setTypesToName: { [setType: number]: SetsLangMap<string> }
  setTypeToSetIdsForSetTypeTable: { [setType: number]: unknown }

  setItemTypes: { [itemType: number]: boolean }
  equipTypesValid: { [equipType: number]: boolean }
  isJewelryEquipType: { [equipType: number]: boolean }
  isWeaponEquipType: { [equipType: number]: boolean }
  isArmorEquipType: { [equipType: number]: boolean }
  traitTypesValid: { [traitType: number]: boolean }
  isJewelryTraitType: { [traitType: number]: boolean }
  isWeaponTraitType: { [traitType: number]: boolean }
  isArmorTraitType: { [traitType: number]: boolean }
  enchantSearchCategoryTypesValid: { [category: string]: boolean }

  equipTypesSets: { [setId: number]: unknown }
  armorSets: { [setId: number]: unknown }
  armorTypesSets: { [setId: number]: unknown }
  jewelrySets: { [setId: number]: unknown }
  weaponSets: { [setId: number]: unknown }
  weaponTypesSets: { [setId: number]: unknown }
  nonPerfectedSet2PerfectedSet: { [setId: number]: unknown }
  perfectedSet2NonPerfectedSet: { [setId: number]: unknown }
  perfectedSetsInfo: { [setId: number]: unknown }
  perfectedSets: { [setId: number]: unknown }
  nonPerfectedSets: { [setId: number]: unknown }

  countMonsterSetBonus: number
  countUndauntedChests: number
  undauntedChestIds: SetsLangMap<{ [chestIndex: number]: string }>

  armorTypeNames: { [armorType: number]: string }
  weaponTypeNames: { [weaponType: number]: string }

  allowedDropMechanics: { [dropMechanicId: number]: boolean }
  dropZones: { [key: number]: unknown }
  dropZone2SetIds: { [key: number]: unknown }
  setId2DropZones: { [setId: number]: unknown }
  dropLocationNames: { [key: number]: unknown }
  dropLocationNames2SetIds: { [key: string]: unknown }
  setId2DropLocationNames: { [setId: number]: unknown }
  dropMechanicIdToName: SetsLangMap<{ [dropMechanicId: number]: string }>
  dropMechanicIdToNameTooltip: SetsLangMap<{ [dropMechanicId: number]: string }>

  localization: SetsLangMap<{ [key: string]: unknown }>
  specialZoneNames: SetsLangMap<{ [zoneId: number]: string }>
  dropMechanicIdToTexture: { [dropMechanicId: number]: string }
  setTypeToTexture: { [key: string]: string }
  setTypeToDropZoneLocalizationStr: { [key: string]: unknown }

  possibleSetSearchFavoriteCategoriesUnsorted: { [category: string]: string }
  possibleSetSearchFavoriteCategories: {
    category: string
    categoryName: unknown
    texture: string
  }[]

  possibleDlcTypes: { [index: number]: string }
  allowedDLCTypes: { [dlcType: number]: boolean }
  possibleDlcIds: { [index: number]: string }
  allowedDLCIds: { [dlcId: number]: boolean }
  dlcAndChapterCollectibleIds: { [dlcId: number]: SetsDlcEntry }
  CleanDLCTimeStamp: (
    this: void,
    releaseDateTimestamp: number | undefined,
    withoutColon?: boolean
  ) => LuaMultiReturn<[string, string]>
  DLCAndCHAPTERData: { [dlcId: number]: string }
  DLCAndCHAPTERDataOrdered: { [index: number]: number }
  DLCandCHAPTERLookupdata: { [dlcType: number]: { [dlcId: number]: string } }
  NONDLCData: { [dlcId: number]: string }
  NONDLCLookupdata: { [dlcType: number]: { [dlcId: number]: string } }

  classData: SetsClassData
}
interface SetsApi {
  setInfo: { [setId: number]: { [key: string]: unknown } }
  blacklistedSetIds: { [setId: number]: boolean }
  specialBonusSets: { [setId: number]: unknown }
  setsOfNewerAPIVersion: number[]
  zoneIdsOfNewAPIVersionOnly: number[]
  noSetIdSets: { [setId: number]: { [key: string]: unknown } }
  removeFutureSetData?: (this: void) => void

  scrollableMenu?: unknown
  libCustomMenu?: unknown
  libAddonMenu?: unknown
  libSlashCommander?: unknown
  libZone?: unknown
  CheckOptionalLibraries: (this: void) => void
  CheckScrollableMenu: (this: void) => boolean

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
  getSetsSetPreviewTooltipSavedVariables: (this: void) => unknown

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
interface SetsApi {
  itemSetCollectionBookMoreOptionsButton?: SetsMoreOptionsButton

  currentAPIVersion: number

  debugGetAllDataIsRunning: boolean

  OpenSetItemCollectionBrowserForCurrentZone: (
    this: void,
    useParentZoneId?: boolean
  ) => boolean | undefined
}

interface SetsApi {
  DebugGetWayshrineInfo: (this: void) => { [nodeId: number]: string } | undefined
  DebugResetSavedVariables: (this: void, noReloadInfo?: boolean, onlyNames?: boolean) => void
  DebugCompressSetItemIdsNow: (
    this: void,
    setsDataTable?: { [setId: number]: { [itemId: number]: number } },
    noReloadInfo?: boolean
  ) => void
  DebugGetAllZoneInfo: (this: void) => void
  DebugGetAllMapNames: (this: void) => void
  DebugGetAllWayshrineInfoOfCurrentMap: (this: void) => void
  DebugGetAllWayshrineNames: (this: void) => void
  DebugGetAllSetNames: (this: void, noReloadInfo?: boolean) => void
  DebugScanAllSetData: (
    this: void,
    keepUncompressedetItemIds?: boolean,
    noReloadInfo?: boolean
  ) => void
  DebugGetDungeonFinderData: (
    this: void,
    dungeonFinderIndex?: number,
    noReloadInfo?: boolean
  ) => void
  DebugGetAllAchievementCategoryNames: (
    this: void,
    achievementStartId?: number,
    achievementEndId?: number,
    noReloadInfo?: boolean,
    ingameList?: boolean
  ) => void
  DebugGetAllCollectibleDLCNames: (this: void, noReloadInfo?: boolean) => void
  DebugGetAllCollectibleNames: (this: void, noReloadInfo?: boolean) => void
  DebugShowNewSetIds: (this: void, noChatOutput?: boolean) => void
  DebugGetAllNames: (this: void, noReloadInfo?: boolean) => void
  debugBuildMixedSetNames: (this: void) => void

  GetDungeonFinderDataFromChildNodes: (
    this: void,
    treeNode: unknown,
    retTable: string[] | undefined,
    extra: unknown
  ) => number
  OpenDungeonFinder: (
    this: void,
    dungeonFinderIndex: number | undefined,
    callback: (this: void, dungeonFinderIndex?: number, noReloadInfo?: boolean) => void,
    noReloadInfo: boolean
  ) => void
}

interface SetsApi {
  CopyDialog: SetsCopyDialog
}

interface SetsApi {
  commandsLsp?: { [langKey: string]: LibSlashCommanderCommand }
  buildLSCSetSearchAutoComplete: (this: void) => void
}

interface SetsApi {
  buildSetTypeInfo: (
    this: void,
    setData: { setType?: number; setId?: number; classId?: number; [key: string]: unknown },
    withTexture?: boolean
  ) => LuaMultiReturn<[string, string | undefined]>
  BuildSetDataText: (
    this: void,
    setData: { [key: string]: unknown },
    itemLink: string | undefined,
    withoutHeaderLine?: boolean
  ) => LuaMultiReturn<[string, { [part: string]: SetsSetInfoPart }, string]>

  GetSpecialZoneNameById: (this: void, zoneId: number, lang?: string) => string | undefined
  GetCurrentZoneName: (this: void) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetAllDropZones: (this: void) => unknown
  GetAllDropLocationNames: (this: void, lang?: string) => unknown
  GetDLCInfo: (this: void, dlcId: number) => LuaMultiReturn<[string, number | undefined]>

  OpenSetItemCollectionBookForItemLink: (this: void, itemLink: string) => void
  ShowSettingsMenu: (this: void, ...args: unknown[]) => void

  RegisterCustomTooltipHook: (this: void, tooltipControlName: string, addonName: string) => boolean

  SearchUI: {
    name: string
    controlName: LuaMap<boolean, string>
    control: LuaMap<boolean, unknown>
    KeyboardVars: { minWidth: number; minHeight: number }
  }

  searchUIKeyboard?: SetsSearchUIKeyboardObject

  XMLGetDynamicWidth?: (
    this: void,
    XMLcontrol: SearchUIControl | undefined,
    minWidth?: number | string | ((this: void, control: SearchUIControl) => number),
    maxWidth?: number | string | ((this: void, control: SearchUIControl) => number),
    applyValues?: boolean,
    minHeight?: number,
    maxHeight?: number,
    forceMaxWidth?: boolean
  ) => number | string | undefined
}

interface SetsApi {
  GetDropMechanicTexture: (this: void, dropMechanicId: number | undefined) => string | undefined
  IsSetsCustomTooltipEnabled: (this: void, value?: string) => boolean
  IsSetsTooltipEnabled: (this: void) => void
  HookTooltipControls: (
    this: void,
    onlyAddonAdded?: boolean,
    customAddonTooltipCtrl?: unknown
  ) => void
  loadTooltipHooks: (this: void, wasInputModeChanged?: boolean) => void

  LAMsettingsPanel?: unknown

  GetZoneName: (this: void, zoneId: number | undefined, lang?: string) => string | undefined
  GetDLCName: (this: void, dlcId: number | undefined, lang?: string) => string | undefined
  GetDungeonZoneIdParentZoneId: (this: void, zoneId: number | undefined) => number | undefined
  GetPublicDungeonZoneIdParentZoneId: (this: void, zoneId: number | undefined) => number | undefined
  addUIButtons?: (this: void) => void
  addSetCollectionsSearchItemLinkContextMenuEntry?: (this: void) => void
  LCM?: unknown
}
