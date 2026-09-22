import {
  asNumber,
  asPresent,
  asString,
  asStrRecord,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import {
  asSearchHistoryStringMap,
  asSearchHistoryUnknownMap,
  asSearchHistoryUnknownMapPresent,
  asSetInfoMap,
  asStringOptArray,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"

const EM = EVENT_MANAGER

const tsort = table.sort
const strlow = string.lower
const zoite = ZO_IsTableEmpty

const sets_GetSetInfo = lib.GetSetInfo

import { searchHistoryEventUpdaterName } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-scrollable-menu/lib-scrollable-menu.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-2/sets-search-ui-shapes-2.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import {
  SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES,
  SETS_TABLEKEY_DROPMECHANIC_NAMES,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

let wasSetsDataScannedAndAdded = false

function scanAndAddDataToSetsMasterListBase(
  this: void,
  defaultMasterListBase: { [setId: number]: { [key: string]: unknown } },
  oneSetId: number | undefined,
  oneSetData: { [key: string]: unknown } | undefined
): { [setId: number]: { [key: string]: unknown } } | { [key: string]: unknown } {
  if (oneSetId !== undefined && oneSetData !== undefined) {
    let setData = oneSetData
    setData.setId = setData.setId ?? oneSetId
    if (
      setData[asPresent(SETS_TABLEKEY_DROPMECHANIC_NAMES)] === undefined ||
      setData[asPresent(SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES)] === undefined
    ) {
      setData = asStrRecord(sets_GetSetInfo(oneSetId, false, undefined))
    }
    return setData
  }
  for (const [setId, setDataIter] of pairs(defaultMasterListBase)) {
    let setData = setDataIter
    setData.setId = setData.setId ?? setId
    if (
      setData[asPresent(SETS_TABLEKEY_DROPMECHANIC_NAMES)] === undefined ||
      setData[asPresent(SETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES)] === undefined
    ) {
      setData = asStrRecord(sets_GetSetInfo(setId, false, undefined))
      defaultMasterListBase[setId] = setData
    }
  }
  wasSetsDataScannedAndAdded = true
  return defaultMasterListBase
}

export function updateSetsInfoWithDataAndNames(
  this: void,
  selfVar: SetsSearchUISharedObject
): undefined {
  if (!wasSetsDataScannedAndAdded) {
    const setsData = lib.setInfo
    const setsDataNew = asSetInfoMap(
      scanAndAddDataToSetsMasterListBase(setsData, undefined, undefined)
    )
    lib.setInfo = setsDataNew

    selfVar.resultsList.RefreshData()
  }
}

export function clearSearchHistory(this: void, searchType: string): undefined {
  const settings = asPresent(lib.svData)
  const searchHistory = asSearchHistoryUnknownMap(settings.setSearchHistory)
  if (zoite(searchHistory[searchType])) {
    return
  }
  asSearchHistoryUnknownMapPresent(asPresent(lib.svData).setSearchHistory)[searchType] = []
}

function updateSearchHistory(this: void, searchType: string, searchValue: string): undefined {
  const settings = asPresent(lib.svData)
  const maxSearchHistoryEntries = asNumber(settings.setSearchHistoryMaxEntries)
  const searchHistory = asSearchHistoryStringMap(settings.setSearchHistory)
  searchHistory[searchType] = searchHistory[searchType] ?? []
  const searchHistoryOfSearchType = asPresent(searchHistory[searchType])
  const toSearch = strlow(searchValue)
  if (!ZO_IsElementInNumericallyIndexedTable(searchHistoryOfSearchType, toSearch)) {
    asPresent(searchHistory[searchType]).unshift(searchValue)
    const countEntries = asPresent(searchHistory[searchType]).length
    if (countEntries > maxSearchHistoryEntries) {
      for (let i = maxSearchHistoryEntries + 1; i <= countEntries; i += 1) {
        asStringOptArray(asPresent(searchHistory[searchType]))[i - 1] = undefined
      }
    }
  }
}

export function updateSearchHistoryDelayed(
  this: void,
  searchType: string,
  searchValue: string
): undefined {
  EM.UnregisterForUpdate(searchHistoryEventUpdaterName)
  EM.RegisterForUpdate(searchHistoryEventUpdaterName, 1500, () => {
    EM.UnregisterForUpdate(searchHistoryEventUpdaterName)
    updateSearchHistory(searchType, searchValue)
  })
}

const WAYSHRINES_ADDED: { [wsIndex: number]: boolean } = {}
const WAYSHRINE_NAMES: { [wsIndex: number]: string } = {}

export function checkAndGetWayshrineName(
  this: void,
  wayShrineIndices: number[] | undefined
): undefined {
  if (wayShrineIndices !== undefined && type(wayShrineIndices) === "table") {
    for (const [, wsIndex] of ipairs(wayShrineIndices)) {
      if (wsIndex > 0 && !WAYSHRINES_ADDED[wsIndex]) {
        const [, wsName] = GetFastTravelNodeInfo(wsIndex)
        if (wsName !== undefined && wsName !== "") {
          const wsNameLocalized = ZO_CachedStrFormat("<<C:1>>", wsName)
          if (wsNameLocalized !== undefined && wsNameLocalized !== "") {
            WAYSHRINES_ADDED[wsIndex] = true
            WAYSHRINE_NAMES[wsIndex] = wsNameLocalized
          }
        }
      }
    }
  }
}

type CustomContextMenuEntry = {
  headerName?: string
  name?: string
  entries?: LSMSubmenuEntry[]
  visible?: (this: void, ...args: unknown[]) => unknown
  visibleFunc?: (this: void, ...args: unknown[]) => unknown
}

type CustomContextMenuRegistry = { [key: string]: { [addon: string]: CustomContextMenuEntry } }
function asCustomContextMenuRegistry(value: unknown): CustomContextMenuRegistry {
  return value as CustomContextMenuRegistry
}

export function addOtherAddonsContextMenuEntries(
  this: void,
  rowControl: SearchUIControl,
  _setId: number | undefined
): undefined {
  const customContextMenuEntriesSetSearch = asCustomContextMenuRegistry(
    lib.customContextMenuEntries
  )["setSearchUI"]
  if (customContextMenuEntriesSetSearch === undefined) {
    return
  }
  let dividerWasAdded = false
  const customAddonContextmenuEntries: string[] = []
  for (const [addonName] of pairs(customContextMenuEntriesSetSearch)) {
    customAddonContextmenuEntries.push(asString(addonName))
  }
  tsort(customAddonContextmenuEntries)

  for (const [, addonName] of ipairs(customAddonContextmenuEntries)) {
    const customContextMenuEntriesData = customContextMenuEntriesSetSearch[addonName]
    if (customContextMenuEntriesData !== undefined) {
      const submenuName = customContextMenuEntriesData.name
      const submenuEntries = customContextMenuEntriesData.entries
      if (submenuName !== undefined && submenuEntries !== undefined) {
        let isVisible: unknown = true
        const isVisibleFunc = customContextMenuEntriesData.visibleFunc
        if (isVisibleFunc !== undefined) {
          isVisible = isVisibleFunc(rowControl)
        }
        if (isVisible === true) {
          if (!dividerWasAdded) {
            AddCustomScrollableMenuDivider()
            dividerWasAdded = true
          }
          const headerName = customContextMenuEntriesData.headerName
          if (headerName !== undefined) {
            AddCustomScrollableMenuHeader(headerName)
          }
          AddCustomScrollableSubMenuEntry(submenuName, submenuEntries)
        }
      }
    }
  }
}
