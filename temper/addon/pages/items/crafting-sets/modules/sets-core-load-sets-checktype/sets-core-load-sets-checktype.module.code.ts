import {
  asNumber,
  asNumberArray,
  asNumberOpt,
  asPresent,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asIndexNumberMapOpt,
  asItemIdNumberMap,
  asLibSlots,
  asSetIdBoolMap,
  asSetIdTable,
  asSetIdToStrRecord,
  asStrRecordEntryOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import {
  asLangIndexStringMapOpt,
  asLangNameBoolMap,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { checkIfSetExists } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-set-checking/sets-core-set-checking.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import {
  SETS_SET_ITEMID_TABLE_VALUE_OK,
  SETS_TABLEKEY_SETITEMIDS,
  SETS_TABLEKEY_SETITEMIDS_NO_SETID,
  SETS_TABLEKEY_SETNAMES,
  SETS_TABLEKEY_SETNAMES_NO_SETID,
  SETS_TABLEKEY_SETTYPE,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

export interface LoadSetsState {
  dropZones: { [zoneId: number]: boolean }
  setId2ZoneIds: { [setId: number]: { [zoneId: number]: boolean } }
  zoneId2SetIds: { [zoneId: number]: { [setId: number]: boolean } }
  dropLocationNames: { [lang: string]: string[] }
  setId2DropLocations: { [setId: number]: { [lang: string]: { [name: string]: boolean } } }
  dropLocation2SetIds: { [lang: string]: { [name: string]: { [setId: number]: boolean } } }
  dropLocationNamesAdded: { [lang: string]: { [name: string]: boolean } }
  preloadedSetsWithProcsAllowedInPvP: { [setId: number]: unknown }
}

function isNonESOSetOf(
  this: void,
  noSetIdSets: { [setId: number]: unknown },
  setId: number
): boolean {
  return noSetIdSets[setId] !== undefined
}

export function checkSetTypeAndUpdateLibTablesAndCounters(
  this: void,
  setDataTable: { [setId: number]: { [k: string]: unknown } },
  state: LoadSetsState
): undefined {
  const libDyn = asLibSlots(lib)
  const noSetIdSets = lib.noSetIdSets
  const setInfo = lib.setInfo
  const setIds = lib.setIds
  const counterSuffix = lib.counterSuffix
  const setTypeToLibraryInternalVariableNames = lib.setTypeToLibraryInternalVariableNames
  const decompressSetIdItemIds = lib.DecompressSetIdItemIds
  const cachedSetItemIdsTable = lib.CachedSetItemIdsTable
  const preloaded = lib.setDataPreloaded
  const preloadedItemIds = asSetIdTable(preloaded[SETS_TABLEKEY_SETITEMIDS])
  const preloadedSetNames = asSetIdTable(preloaded[SETS_TABLEKEY_SETNAMES])
  const preloadedNonESOsetIdItemIds = asSetIdTable(preloaded[SETS_TABLEKEY_SETITEMIDS_NO_SETID])
  const preloadedNonESOsetIdSetNames = asSetIdTable(preloaded[SETS_TABLEKEY_SETNAMES_NO_SETID])

  const perfectedSet2NonPerfectedSet = lib.perfectedSet2NonPerfectedSet
  const nonPerfectedSet2PerfectedSet = lib.nonPerfectedSet2PerfectedSet
  const perfectedSets = asNumberArray(lib.perfectedSets)
  const nonPerfectedSets = asNumberArray(lib.nonPerfectedSets)

  for (const [setId, setData] of pairs(setDataTable)) {
    const isNonESOSet = isNonESOSetOf(noSetIdSets, setId)
    if (isNonESOSet === true || checkIfSetExists(setId) === true) {
      setIds[setId] = true
      let refToSetIdTable: { [k: string]: unknown } | undefined
      const setType = asNumberOpt(setData[SETS_TABLEKEY_SETTYPE])
      if (setType !== undefined) {
        const internalLibsSetVariableNames = setTypeToLibraryInternalVariableNames[setType]
        const internalLibsSetTableName =
          internalLibsSetVariableNames !== undefined
            ? internalLibsSetVariableNames["tableName"]
            : undefined
        if (internalLibsSetTableName !== undefined) {
          const internalLibsSetCounterName = internalLibsSetTableName + counterSuffix
          if (
            libDyn[internalLibsSetTableName] !== undefined &&
            libDyn[internalLibsSetCounterName] !== undefined
          ) {
            const setTypeTable = asSetIdToStrRecord(libDyn[internalLibsSetTableName])
            setTypeTable[setId] = setData
            const counterVarCurrent = asNumber(libDyn[internalLibsSetCounterName])
            libDyn[internalLibsSetCounterName] = counterVarCurrent + 1
            refToSetIdTable = setTypeTable[setId]
          }
        }
      }

      if (refToSetIdTable !== undefined) {
        const itemIds = decompressSetIdItemIds(setId, isNonESOSet)
        if (itemIds !== undefined && !ZO_IsTableEmpty(itemIds)) {
          refToSetIdTable[SETS_TABLEKEY_SETITEMIDS] = itemIds
          if (isNonESOSet === true) {
            asPresent(noSetIdSets[setId])[SETS_TABLEKEY_SETITEMIDS] = itemIds
          } else {
            asPresent(setInfo[setId])[SETS_TABLEKEY_SETITEMIDS] = itemIds
          }
        }

        let setNames: unknown
        if (isNonESOSet === true) {
          setNames = preloadedNonESOsetIdSetNames[setId]
        } else {
          setNames = preloadedSetNames[setId]
        }
        if (setNames !== undefined) {
          refToSetIdTable[SETS_TABLEKEY_SETNAMES] = setNames
          if (isNonESOSet === true) {
            asPresent(noSetIdSets[setId])[SETS_TABLEKEY_SETNAMES] = setNames
          } else {
            asPresent(setInfo[setId])[SETS_TABLEKEY_SETNAMES] = setNames
          }
        }

        const setInfoEntry = asStrRecordEntryOpt(setInfo[setId])
        if (
          setInfoEntry !== undefined &&
          setInfoEntry["isProcSetAllowedInPvP"] !== undefined &&
          setInfoEntry["isProcSetAllowedInPvP"] === SETS_SET_ITEMID_TABLE_VALUE_OK
        ) {
          state.preloadedSetsWithProcsAllowedInPvP[setId] = refToSetIdTable
        }
      }

      let setInfoTableRef: { [setId: number]: { [k: string]: unknown } } | undefined
      if (isNonESOSet === true) {
        setInfoTableRef = asSetIdToStrRecord(noSetIdSets)
      } else {
        setInfoTableRef = asSetIdToStrRecord(setInfo)
      }
      if (setInfoTableRef !== undefined) {
        const setInfoTableRefEntry = setInfoTableRef[setId]
        if (setInfoTableRefEntry !== undefined) {
          fileZoneAndDropData(setId, setInfoTableRefEntry, state)
        } else {
          clearZoneAndDropData(setId, state)
        }
      }
    } else {
      let setInfoTableRefToClear: { [setId: number]: unknown } | undefined
      if (isNonESOSetOf(noSetIdSets, setId) === true) {
        setInfoTableRefToClear = asSetIdTable(noSetIdSets)
      } else {
        setInfoTableRefToClear = asSetIdTable(setInfo)
      }
      if (setInfoTableRefToClear !== undefined) {
        setInfoTableRefToClear[setId] = undefined

        preloadedItemIds[setId] = undefined
        cachedSetItemIdsTable[setId] = asItemIdNumberMap(undefined)
        preloadedNonESOsetIdItemIds[setId] = undefined
        preloadedSetNames[setId] = undefined
        preloadedNonESOsetIdSetNames[setId] = undefined
        state.preloadedSetsWithProcsAllowedInPvP[setId] = undefined

        clearZoneAndDropData(setId, state)
      }
    }

    const unPerfectedSetId = GetItemSetUnperfectedSetId(setId)
    if (unPerfectedSetId !== undefined && unPerfectedSetId > 0) {
      const perfectedInfo = setInfo[setId]
      if (perfectedInfo !== undefined) {
        perfectedInfo["isPerfectedSet"] = SETS_SET_ITEMID_TABLE_VALUE_OK
      }
      const unPerfectedInfo = setInfo[unPerfectedSetId]
      if (unPerfectedInfo !== undefined) {
        unPerfectedInfo["perfectedSetId"] = setId
      }
      const setIdZones = state.setId2ZoneIds[setId]
      const perfectedSetZoneId = setIdZones !== undefined ? setIdZones[1] : undefined
      const unPerfZones = state.setId2ZoneIds[unPerfectedSetId]
      const nonPerfectedSetZoneId = unPerfZones !== undefined ? unPerfZones[1] : undefined

      perfectedSet2NonPerfectedSet[setId] = {
        setId: unPerfectedSetId,
        zoneId: nonPerfectedSetZoneId,
      }
      nonPerfectedSet2PerfectedSet[unPerfectedSetId] = {
        setId: setId,
        zoneId: perfectedSetZoneId,
      }

      perfectedSets[perfectedSets.length] = setId
      nonPerfectedSets[nonPerfectedSets.length] = unPerfectedSetId
    }
  }
}

function fileZoneAndDropData(
  this: void,
  setId: number,
  setInfoTableRefEntry: { [k: string]: unknown },
  state: LoadSetsState
): undefined {
  const zoneIds = asIndexNumberMapOpt(setInfoTableRefEntry["zoneIds"])
  if (zoneIds !== undefined) {
    const zonesOfSet: { [zoneId: number]: boolean } = {}
    state.setId2ZoneIds[setId] = zonesOfSet
    for (const [, zoneId] of ipairs(zoneIds)) {
      state.dropZones[zoneId] = true
      zonesOfSet[zoneId] = true
      const setsOfZone = state.zoneId2SetIds[zoneId] ?? {}
      state.zoneId2SetIds[zoneId] = setsOfZone
      setsOfZone[setId] = true
    }
  }
  const dropMechanicDropLocationNames = asLangIndexStringMapOpt(
    setInfoTableRefEntry["dropMechanicDropLocationNames"]
  )
  if (dropMechanicDropLocationNames !== undefined) {
    for (const [languageOfDropLocationName, dropLocationNamesInLang] of pairs(
      dropMechanicDropLocationNames
    )) {
      for (const [, dropLocationNameInLang] of ipairs(dropLocationNamesInLang)) {
        if (dropLocationNameInLang !== "") {
          const addedForLang = state.dropLocationNamesAdded[languageOfDropLocationName]
          if (addedForLang === undefined || !addedForLang[dropLocationNameInLang]) {
            const namesAddedForLang = addedForLang ?? {}
            state.dropLocationNamesAdded[languageOfDropLocationName] = namesAddedForLang
            namesAddedForLang[dropLocationNameInLang] = true

            const dropLocationNamesForLang =
              state.dropLocationNames[languageOfDropLocationName] ?? []
            state.dropLocationNames[languageOfDropLocationName] = dropLocationNamesForLang
            dropLocationNamesForLang[dropLocationNamesForLang.length] = dropLocationNameInLang
          }

          const setIdDropLocs = state.setId2DropLocations[setId] ?? {}
          state.setId2DropLocations[setId] = setIdDropLocs
          const setIdDropLocsForLang = setIdDropLocs[languageOfDropLocationName] ?? {}
          setIdDropLocs[languageOfDropLocationName] = setIdDropLocsForLang
          setIdDropLocsForLang[dropLocationNameInLang] = true
          const dropLoc2SetIdsLang = state.dropLocation2SetIds[languageOfDropLocationName] ?? {}
          state.dropLocation2SetIds[languageOfDropLocationName] = dropLoc2SetIdsLang
          const setIdsOfDropLocation = dropLoc2SetIdsLang[dropLocationNameInLang] ?? {}
          dropLoc2SetIdsLang[dropLocationNameInLang] = setIdsOfDropLocation
          setIdsOfDropLocation[setId] = true
        }
      }
    }
  }
}

function clearZoneAndDropData(this: void, setId: number, state: LoadSetsState): undefined {
  state.setId2ZoneIds[setId] = asSetIdBoolMap(undefined)
  if (!ZO_IsTableEmpty(state.zoneId2SetIds)) {
    for (const [, setIdsInZone] of pairs(state.zoneId2SetIds)) {
      for (const [setIdInZone, isActive] of pairs(setIdsInZone)) {
        if (setIdInZone === setId && isActive === true) {
          const setIdsInZoneClearable: { [setId: number]: boolean | undefined } = setIdsInZone
          setIdsInZoneClearable[setId] = undefined
        }
      }
    }
  }
  state.setId2DropLocations[setId] = asLangNameBoolMap(undefined)
  if (!ZO_IsTableEmpty(state.dropLocation2SetIds)) {
    for (const [, dropLocationNamesInLang] of pairs(state.dropLocation2SetIds)) {
      for (const [, setIdsOfDropLocationInLang] of pairs(dropLocationNamesInLang)) {
        for (const [setIdForDropLocation, isActive] of pairs(setIdsOfDropLocationInLang)) {
          if (setIdForDropLocation === setId && isActive === true) {
            const setIdsOfDropLocationClearable: { [setId: number]: boolean | undefined } =
              setIdsOfDropLocationInLang
            setIdsOfDropLocationClearable[setIdForDropLocation] = undefined
          }
        }
      }
    }
  }
}
