import {
  asBoolean,
  asNumber,
  asNumberArray,
  asNumberArrayOpt,
  asNumberOpt,
  asPresent,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asIndexNumberMapOpt,
  asItemIdNumberMap,
  asLibSlots,
  asSetIdBoolMap,
  asSetIdTable,
  asSetIdToStrRecord,
  asStrRecordEntryOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asLangIndexStringMapOpt,
  asLangNameBoolMap,
  asSetIdPerfectedLinkMap,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"
import { checkIfSetExists } from "../lib-sets-core-set-checking/lib-sets-core-set-checking.module.code.ts"

const lib = LibSets

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
  const preloadedItemIds = asSetIdTable(preloaded[LIBSETS_TABLEKEY_SETITEMIDS])
  const preloadedSetNames = asSetIdTable(preloaded[LIBSETS_TABLEKEY_SETNAMES])
  const preloadedNonESOsetIdItemIds = asSetIdTable(preloaded[LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID])
  const preloadedNonESOsetIdSetNames = asSetIdTable(preloaded[LIBSETS_TABLEKEY_SETNAMES_NO_SETID])

  const perfectedSet2NonPerfectedSet = asSetIdPerfectedLinkMap(lib.perfectedSet2NonPerfectedSet)
  const nonPerfectedSet2PerfectedSet = asSetIdPerfectedLinkMap(lib.nonPerfectedSet2PerfectedSet)
  const perfectedSets = asNumberArray(lib.perfectedSets)
  const nonPerfectedSets = asNumberArray(lib.nonPerfectedSets)

  for (const [setId, setData] of pairs(setDataTable)) {
    const isNonESOSet = isNonESOSetOf(noSetIdSets, setId)
    if (isNonESOSet === true || checkIfSetExists(setId) === true) {
      setIds[setId] = true
      let refToSetIdTable: { [k: string]: unknown } | undefined
      const setType = asNumberOpt(setData[LIBSETS_TABLEKEY_SETTYPE])
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
          refToSetIdTable[LIBSETS_TABLEKEY_SETITEMIDS] = itemIds
          if (isNonESOSet === true) {
            asPresent(noSetIdSets[setId])[LIBSETS_TABLEKEY_SETITEMIDS] = itemIds
          } else {
            asPresent(setInfo[setId])[LIBSETS_TABLEKEY_SETITEMIDS] = itemIds
          }
        }

        let setNames: unknown
        if (isNonESOSet === true) {
          setNames = preloadedNonESOsetIdSetNames[setId]
        } else {
          setNames = preloadedSetNames[setId]
        }
        if (setNames !== undefined) {
          refToSetIdTable[LIBSETS_TABLEKEY_SETNAMES] = setNames
          if (isNonESOSet === true) {
            asPresent(noSetIdSets[setId])[LIBSETS_TABLEKEY_SETNAMES] = setNames
          } else {
            asPresent(setInfo[setId])[LIBSETS_TABLEKEY_SETNAMES] = setNames
          }
        }

        const setInfoEntry = asStrRecordEntryOpt(setInfo[setId])
        if (
          setInfoEntry !== undefined &&
          setInfoEntry["isProcSetAllowedInPvP"] !== undefined &&
          setInfoEntry["isProcSetAllowedInPvP"] === LIBSETS_SET_ITEMID_TABLE_VALUE_OK
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
      let perfectedSetZoneId: number | undefined
      let nonPerfectedSetZoneId: number | undefined
      const setIdZones = asNumberArrayOpt(state.setId2ZoneIds[setId])
      if (setIdZones !== undefined && setIdZones.length >= 1) {
        perfectedSetZoneId = setIdZones[0]
      }
      const unPerfZones = asNumberArrayOpt(state.setId2ZoneIds[unPerfectedSetId])
      if (unPerfZones !== undefined && unPerfZones.length >= 1) {
        nonPerfectedSetZoneId = unPerfZones[0]
      }

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
    state.setId2ZoneIds[setId] = {}
    for (const [, zoneId] of ipairs(zoneIds)) {
      state.dropZones[zoneId] = true
      asPresent(state.setId2ZoneIds[setId])[zoneId] = true
      state.zoneId2SetIds[zoneId] = state.zoneId2SetIds[zoneId] ?? {}
      asPresent(state.zoneId2SetIds[zoneId])[setId] = true
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
            state.dropLocationNamesAdded[languageOfDropLocationName] =
              state.dropLocationNamesAdded[languageOfDropLocationName] ?? {}
            asPresent(state.dropLocationNamesAdded[languageOfDropLocationName])[
              dropLocationNameInLang
            ] = true

            state.dropLocationNames[languageOfDropLocationName] =
              state.dropLocationNames[languageOfDropLocationName] ?? []
            const dropLocationNamesForLang = asPresent(
              state.dropLocationNames[languageOfDropLocationName]
            )
            dropLocationNamesForLang[dropLocationNamesForLang.length] = dropLocationNameInLang
          }

          state.setId2DropLocations[setId] = state.setId2DropLocations[setId] ?? {}
          const setIdDropLocs = asPresent(state.setId2DropLocations[setId])
          setIdDropLocs[languageOfDropLocationName] =
            setIdDropLocs[languageOfDropLocationName] ?? {}
          asPresent(setIdDropLocs[languageOfDropLocationName])[dropLocationNameInLang] = true
          state.dropLocation2SetIds[languageOfDropLocationName] =
            state.dropLocation2SetIds[languageOfDropLocationName] ?? {}
          const dropLoc2SetIdsLang = asPresent(
            state.dropLocation2SetIds[languageOfDropLocationName]
          )
          dropLoc2SetIdsLang[dropLocationNameInLang] =
            dropLoc2SetIdsLang[dropLocationNameInLang] ?? {}
          asPresent(dropLoc2SetIdsLang[dropLocationNameInLang])[setId] = true
        }
      }
    }
  }
}

function clearZoneAndDropData(this: void, setId: number, state: LoadSetsState): undefined {
  state.setId2ZoneIds[setId] = asSetIdBoolMap(undefined)
  if (!ZO_IsTableEmpty(state.zoneId2SetIds)) {
    for (const [zoneId, setIdsInZone] of pairs(state.zoneId2SetIds)) {
      for (const [setIdInZone, isActive] of pairs(setIdsInZone)) {
        if (setIdInZone === setId && isActive === true) {
          asPresent(state.zoneId2SetIds[zoneId])[setId] = asBoolean(undefined)
        }
      }
    }
  }
  state.setId2DropLocations[setId] = asLangNameBoolMap(undefined)
  if (!ZO_IsTableEmpty(state.dropLocation2SetIds)) {
    for (const [languageOfDropLocationName, dropLocationNamesInLang] of pairs(
      state.dropLocation2SetIds
    )) {
      for (const [dropLocationNameInLang, setIdsOfDropLocationInLang] of pairs(
        dropLocationNamesInLang
      )) {
        for (const [setIdForDropLocation, isActive] of pairs(setIdsOfDropLocationInLang)) {
          if (setIdForDropLocation === setId && isActive === true) {
            asPresent(
              asPresent(state.dropLocation2SetIds[languageOfDropLocationName])[
                dropLocationNameInLang
              ]
            )[setIdForDropLocation] = asBoolean(undefined)
          }
        }
      }
    }
  }
}
