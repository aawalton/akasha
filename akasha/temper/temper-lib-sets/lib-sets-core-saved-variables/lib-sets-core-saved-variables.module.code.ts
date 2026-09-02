import { asPresent, asString, asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asCategoryRecord,
  asFavoritesRecordOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"

const lib = LibSets

const worldName = GetWorldName()

function runAfterSVLoadTasks(this: void): undefined {
  const svData = asPresent(lib.svData)
  const savedSetSearchFavorites = asFavoritesRecordOpt(svData["setSearchFavorites"])
  if (savedSetSearchFavorites === undefined) {
    return
  }
  const savedSetSearchFavoritesStar = asPresent(
    asFavoritesRecordOpt(savedSetSearchFavorites["star"])
  )

  const possibleSetSearchFavoriteCategoriesUnsorted =
    lib.possibleSetSearchFavoriteCategoriesUnsorted
  if (!ZO_IsTableEmpty(savedSetSearchFavorites)) {
    for (const [setIdOrSetSearchFavoriteCategory, isSavedFavorite] of pairs(
      savedSetSearchFavorites
    )) {
      if (
        possibleSetSearchFavoriteCategoriesUnsorted[asString(setIdOrSetSearchFavoriteCategory)] ===
          undefined &&
        isSavedFavorite === true
      ) {
        savedSetSearchFavoritesStar[setIdOrSetSearchFavoriteCategory] = true
        savedSetSearchFavorites[setIdOrSetSearchFavoriteCategory] = undefined
      }
    }
  }
}

function updateDefaultsData(
  this: void,
  defaultsSV: { [key: string]: unknown }
): { [key: string]: unknown } {
  if (defaultsSV["setSearchFavorites"] === undefined) {
    defaultsSV["setSearchFavorites"] = {}
  }
  const setSearchFavorites = asCategoryRecord(defaultsSV["setSearchFavorites"])
  for (const [setSearchFavoriteCategory] of pairs(
    lib.possibleSetSearchFavoriteCategoriesUnsorted
  )) {
    setSearchFavorites[setSearchFavoriteCategory] = {}
  }

  return defaultsSV
}

function loadSavedVariables(this: void): undefined {
  if (lib.svData !== undefined) {
    return
  }

  let defaults: { [key: string]: unknown } = {
    modifyTooltips: false,
    tooltipModifications: {
      tooltipTextures: true,
      addSetType: true,
      addDropLocation: true,
      addBossName: true,
      addDropMechanic: true,
      addNeededTraits: true,
      addReconstructionCost: true,
      addDLC: true,
      addFavorites: true,
    },
    useCustomTooltipPattern: "",
    addLineBreakAtCustomTooltipParts: false,

    setPreviewTooltips: {
      sendToChatToo: true,
      equipType: EQUIP_TYPE_CHEST,
      traitType: ITEM_TRAIT_TYPE_ARMOR_DIVINES,
      enchantSearchCategoryType: ENCHANTMENT_SEARCH_CATEGORY_NONE,
      quality: 370,
    },

    addSetCollectionsCurrentZoneButton: true,

    addSetCollectionsSearchItemLink: true,

    searchUI: {
      x: 0,
      y: 0,
      width: 934,
      height: 600,
    },
    setSearchTooltipsAtTextFilters: true,
    setSearchTooltipsAtFilters: true,
    setSearchTooltipsAtFilterEntries: true,
    setSearchShowSetNamesInEnglishToo: false,
    setSearchFavorites: {},
    setSearchSaveNameHistory: true,
    setSearchSaveBonusHistory: true,
    setSearchHistoryMaxEntries: 10,
    setSearchHistory: {
      ["name"]: {},
      ["bonus"]: {},
    },
    setSearchPopupTooltipPosition: RIGHT,
    showSetSearchDropLocationTooltip: false,
    setSearchDropLocationTooltipPos: -1,
    setSearchUIRowLeftClickDefaultAction: "linkToChat",
    setSearchDLCDropdownSortBy: 1,
  }
  defaults = updateDefaultsData(defaults)

  lib.defaultSV = defaults
  lib.svData = ZO_SavedVars.NewAccountWide(
    lib.svName,
    lib.svVersion,
    undefined,
    defaults,
    worldName,
    "$AllAccounts"
  )

  if (lib.clientLang === lib.fallbackLang) {
    lib.svData["setSearchShowSetNamesInEnglishToo"] = false
  }

  runAfterSVLoadTasks()

  const defaultsDebug: { [tableKey: string]: unknown } = {
    [LIBSETS_TABLEKEY_NEWSETIDS]: {},
    [LIBSETS_TABLEKEY_MAPS]: {},
    [LIBSETS_TABLEKEY_SETITEMIDS]: {},
    [LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID]: {},
    [LIBSETS_TABLEKEY_SETITEMIDS_COMPRESSED]: {},
    [LIBSETS_TABLEKEY_SETNAMES]: {},
    [LIBSETS_TABLEKEY_WAYSHRINE_NAMES]: {},
    [LIBSETS_TABLEKEY_ZONE_DATA]: {},
    [LIBSETS_TABLEKEY_DUNGEONFINDER_DATA]: {},
    [LIBSETS_TABLEKEY_ACHIEVEMENT_CATEGORY_NAMES]: {},
    [LIBSETS_TABLEKEY_COLLECTIBLE_DLC_NAMES]: {},
  }
  lib.svDebugData = ZO_SavedVars.NewAccountWide(
    lib.svDebugName,
    1,
    undefined,
    defaultsDebug,
    undefined,
    "$AllAccounts"
  )
}
lib.LoadSavedVariables = loadSavedVariables

function getLibSetsSetPreviewTooltipSavedVariables(this: void): unknown {
  if (lib.svData === undefined) {
    return undefined
  }
  return asTyped<{ [k: string]: unknown }>(lib.svData)["setPreviewTooltips"]
}
lib.getLibSetsSetPreviewTooltipSavedVariables = getLibSetsSetPreviewTooltipSavedVariables
