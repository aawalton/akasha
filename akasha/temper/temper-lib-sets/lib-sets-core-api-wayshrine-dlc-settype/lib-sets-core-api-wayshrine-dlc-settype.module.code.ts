import { asNumber, asNumberOpt, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asIndexNumberMap,
  asIndexStringMapOpt,
  asLangStringMapOpt,
  asLibSlots,
  asSafeReturnApiTableFn,
  asStrRecordEntryOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { asWayshrine2ZoneOpt } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

function safeReturnAPItable(this: void, tabData: unknown): unknown {
  const fn = asSafeReturnApiTableFn(asLibSlots(lib)["_safeReturnAPItable"])
  return fn(tabData)
}

type Wayshrine2Zone = { [wayshrineNodeId: number]: number | undefined }
function getWayshrine2Zone(this: void): Wayshrine2Zone | undefined {
  return asWayshrine2ZoneOpt(lib.setDataPreloaded[LIBSETS_TABLEKEY_WAYSHRINENODEID2ZONEID])
}

function getWayshrineIds(
  this: void,
  setId: number | undefined,
  withRelatedZoneIds?: boolean
): LuaMultiReturn<[unknown, Wayshrine2Zone | undefined]> {
  const withRelatedZoneIdsResolved = withRelatedZoneIds ?? false
  if (setId === undefined) {
    return $multi(undefined, undefined)
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return $multi(undefined, undefined)
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData[LIBSETS_TABLEKEY_WAYSHRINES] === undefined) {
    return $multi(undefined, undefined)
  }
  let wayshrineNodsId2ZoneId: Wayshrine2Zone | undefined
  if (withRelatedZoneIdsResolved) {
    const wayshrine2zone = getWayshrine2Zone()
    if (wayshrine2zone === undefined) {
      return $multi(undefined, undefined)
    }
    wayshrineNodsId2ZoneId = {}
    const wayshrines = asIndexNumberMap(setData[LIBSETS_TABLEKEY_WAYSHRINES])
    for (const [, wayshrineNodeId] of ipairs(wayshrines)) {
      wayshrineNodsId2ZoneId[wayshrineNodeId] = wayshrine2zone[wayshrineNodeId]
    }
  }
  return $multi(safeReturnAPItable(setData[LIBSETS_TABLEKEY_WAYSHRINES]), wayshrineNodsId2ZoneId)
}
lib.GetWayshrineIds = getWayshrineIds

function getWayshrinesZoneId(this: void, wayshrineNodeId: number | undefined): number | undefined {
  if (wayshrineNodeId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const wayshrine2zone = getWayshrine2Zone()
  if (wayshrine2zone === undefined) {
    return undefined
  }
  return wayshrine2zone[wayshrineNodeId]
}
lib.GetWayshrinesZoneId = getWayshrinesZoneId

function getZoneIds(this: void, setId: number | undefined): unknown {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData[LIBSETS_TABLEKEY_ZONEIDS] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setData[LIBSETS_TABLEKEY_ZONEIDS])
}
lib.GetZoneIds = getZoneIds

function getDLCId(this: void, setId: number | undefined): unknown {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData["dlcId"] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setData["dlcId"])
}
lib.GetDLCId = getDLCId
const lib_GetDLCId = getDLCId

function isCurrentDLC(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData["dlcId"] === undefined) {
    return undefined
  }
  const dlcId = asNumber(setData["dlcId"])
  const wasAddedWithCurrentDLC =
    (asNumberOpt(DLC_ITERATION_END) !== undefined && dlcId >= DLC_ITERATION_END) || false
  return wasAddedWithCurrentDLC
}
lib.IsCurrentDLC = isCurrentDLC

function getAllDLCIds(this: void): unknown {
  return safeReturnAPItable(lib.allowedDLCIds)
}
lib.GetAllDLCIds = getAllDLCIds

function getDLCType(this: void, setId: number | undefined): number | undefined {
  const dlcId = asNumberOpt(lib_GetDLCId(setId))
  const allowedDLCIds = lib.allowedDLCIds
  if (dlcId !== undefined && allowedDLCIds[dlcId]) {
    const dlcAndChapterCollectibleIds = lib.dlcAndChapterCollectibleIds
    const dlcType = asPresent(dlcAndChapterCollectibleIds[dlcId]).type
    const allowedDLCTypes = lib.allowedDLCTypes
    if (allowedDLCTypes[dlcType]) {
      return dlcType
    }
  }
  return undefined
}
lib.GetDLCType = getDLCType

function getDLCTypeName(this: void, dlcTypeId: number | undefined): string | undefined {
  const possibleDlcTypesTable = asIndexStringMapOpt(lib.possibleDlcTypes)
  if (!possibleDlcTypesTable) {
    return undefined
  }
  const dlcTypeName = (dlcTypeId !== undefined ? possibleDlcTypesTable[dlcTypeId] : undefined) ?? ""
  return dlcTypeName
}
lib.GetDLCTypeName = getDLCTypeName

function getAllDLCTypes(this: void): unknown {
  return safeReturnAPItable(lib.allowedDLCTypes)
}
lib.GetAllDLCTypes = getAllDLCTypes

function getTraitsNeeded(this: void, setId: number | undefined): unknown {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.IsCraftedSet(setId)) {
    return undefined
  }
  const setInfo = lib.setInfo
  const setData = setInfo[setId]
  if (setData === undefined || setData["traitsNeeded"] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setData["traitsNeeded"])
}
lib.GetTraitsNeeded = getTraitsNeeded

function getSetType(this: void, setId: number | undefined): number | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const setInfo = lib.setInfo
  let setData = asStrRecordEntryOpt(setInfo[setId])
  if (setData === undefined) {
    if (lib.IsNoESOSet(setId)) {
      const noSetIdSets = lib.noSetIdSets
      setData = noSetIdSets[setId]
    } else {
      return undefined
    }
  }
  if (setData === undefined) {
    return undefined
  }
  return asNumberOpt(safeReturnAPItable(setData[LIBSETS_TABLEKEY_SETTYPE]))
}
lib.GetSetType = getSetType

function getSetTypeName(
  this: void,
  libSetsSetType: number | undefined,
  lang?: string
): string | undefined {
  if (libSetsSetType === undefined) {
    return undefined
  }
  const langResolved = lib.LangAllowedCheck(lang)
  const allowedLibSetsSetTypes = lib.allowedSetTypes
  const allowedSetType = allowedLibSetsSetTypes[libSetsSetType] ?? false
  if (!allowedSetType) {
    return undefined
  }
  let setTypeName: string | undefined
  const libSetsSetTypeNames = lib.setTypesToName
  const setTypeNameAllLang = asLangStringMapOpt(libSetsSetTypeNames[libSetsSetType])
  if (setTypeNameAllLang !== undefined && setTypeNameAllLang[langResolved] !== undefined) {
    setTypeName = setTypeNameAllLang[langResolved]
  }
  return setTypeName
}
lib.GetSetTypeName = getSetTypeName

function getAllSetTypes(this: void): unknown {
  return safeReturnAPItable(lib.allowedSetTypes)
}
lib.GetAllSetTypes = getAllSetTypes
