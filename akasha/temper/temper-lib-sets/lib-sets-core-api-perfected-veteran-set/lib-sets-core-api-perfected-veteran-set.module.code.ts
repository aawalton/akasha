import {
  asBoolean,
  asNumberOpt,
  asPresent,
  asStringOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asCheckNoSetIdSetFn,
  asCheckSetFn,
  asGetPerfectedSetDataFn,
  asIsPerfectedSetIdFn,
  asLibSlots,
  asSafeReturnApiTableFn,
  asStrRecordEntryOpt,
  asVoidFn,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { asEquipTypeBoolMap } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const slots = asLibSlots(lib)

const isAPerfectedOrNonPerfectedSetId = asIsPerfectedSetIdFn(
  slots["_isAPerfectedOrNonPerfectedSetId"]
)
const getPerfectedSetData = asGetPerfectedSetDataFn(slots["_getPerfectedSetData"])
const fillPerfectedSetsTables = asVoidFn(slots["_fillPerfectedSetsTables"])
const safeReturnAPItable = asSafeReturnApiTableFn(slots["_safeReturnAPItable"])
const checkSet = asCheckSetFn(slots["_checkSet"])
const checkNoSetIdSet = asCheckNoSetIdSetFn(slots["_checkNoSetIdSet"])

function isAPerfectedOrNonPerfectedSetIdPublic(this: void, setId: number): boolean {
  return isAPerfectedOrNonPerfectedSetId(setId)
}
lib.IsAPerfectedOrNonPerfectedSetId = isAPerfectedOrNonPerfectedSetIdPublic

function isPerfectedSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const perfectedSetData = getPerfectedSetData(setId)
  const result =
    (perfectedSetData !== undefined &&
      perfectedSetData["isPerfectedSet"] === LIBSETS_SET_ITEMID_TABLE_VALUE_OK &&
      true) ||
    false
  return result
}
lib.IsPerfectedSet = isPerfectedSet

function isNonPerfectedSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const perfectedSetData = getPerfectedSetData(setId)
  const result =
    (perfectedSetData !== undefined &&
      (perfectedSetData["isPerfectedSet"] === undefined ||
        perfectedSetData["isPerfectedSet"] === LIBSETS_SET_ITEMID_TABLE_VALUE_NOTOK) &&
      perfectedSetData["perfectedSetId"] !== undefined &&
      true) ||
    false
  return result
}
lib.IsNonPerfectedSet = isNonPerfectedSet

function getPerfectedSetIdFromNonPerfected(
  this: void,
  nonPerfectedSetId: number | undefined
): LuaMultiReturn<[number | undefined, number | undefined]> {
  if (nonPerfectedSetId === undefined) {
    return $multi(undefined, undefined)
  }
  if (!lib.checkIfSetsAreLoadedProperly(nonPerfectedSetId)) {
    return $multi(undefined, undefined)
  }
  const perfectedSetData = getPerfectedSetData(nonPerfectedSetId)
  if (
    perfectedSetData !== undefined &&
    perfectedSetData["isPerfectedSet"] !== undefined &&
    perfectedSetData["isPerfectedSet"] === true
  ) {
    return $multi(
      asNumberOpt(perfectedSetData["perfectedSetId"]),
      asNumberOpt(perfectedSetData["perfectedSetZoneId"])
    )
  }
  return $multi(undefined, undefined)
}
lib.GetPerfectedSetId = getPerfectedSetIdFromNonPerfected

function getPerfectedSetIdFromPerfected(
  this: void,
  perfectedSetId: number | undefined
): LuaMultiReturn<[number | undefined, number | undefined]> {
  if (perfectedSetId === undefined) {
    return $multi(undefined, undefined)
  }
  if (!lib.checkIfSetsAreLoadedProperly(perfectedSetId)) {
    return $multi(undefined, undefined)
  }
  const perfectedSetData = getPerfectedSetData(perfectedSetId)
  if (
    perfectedSetData !== undefined &&
    perfectedSetData["isPerfectedSet"] !== undefined &&
    perfectedSetData["isPerfectedSet"] === false
  ) {
    return $multi(
      asNumberOpt(perfectedSetData["nonPerfectedSetId"]),
      asNumberOpt(perfectedSetData["nonPerfectedSetZoneId"])
    )
  }
  return $multi(undefined, undefined)
}
lib.GetPerfectedSetId = getPerfectedSetIdFromPerfected

function getPerfectedSetInfo(
  this: void,
  setId: number | undefined
): { [k: string]: unknown } | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  if (isAPerfectedOrNonPerfectedSetId(setId) === false) {
    return undefined
  }

  const perfectedSetData = getPerfectedSetData(setId)
  if (perfectedSetData === undefined) {
    return undefined
  }
  return perfectedSetData
}
lib.GetPerfectedSetInfo = getPerfectedSetInfo

function getAllPerfectedSetIds(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const perfectedSets = lib.perfectedSets
  if (ZO_IsTableEmpty(perfectedSets)) {
    fillPerfectedSetsTables()
  }
  return safeReturnAPItable(lib.perfectedSets)
}
lib.GetAllPerfectedSetIds = getAllPerfectedSetIds

function getAllNonPerfectedSetIds(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  const nonPerfectedSets = lib.nonPerfectedSets
  if (ZO_IsTableEmpty(nonPerfectedSets)) {
    fillPerfectedSetsTables()
  }
  return safeReturnAPItable(lib.nonPerfectedSets)
}
lib.GetAllNonPerfectedSetIds = getAllNonPerfectedSetIds

function isNoESOSet(this: void, noESOSetId: number | undefined): boolean {
  if (noESOSetId === undefined) {
    return false
  }
  if (!lib.checkIfSetsAreLoadedProperly(noESOSetId)) {
    return false
  }
  const noSetIdSets = lib.noSetIdSets
  const isNoESOSetId = (noSetIdSets[noESOSetId] !== undefined && true) || false
  return isNoESOSetId
}
lib.IsNoESOSet = isNoESOSet
slots["_isNoESOSet"] = isNoESOSet

function isSetByItemId(
  this: void,
  itemId: number | undefined
): LuaMultiReturn<
  [
    boolean | undefined,
    string | undefined,
    number | undefined,
    number | undefined,
    number | undefined,
    number | undefined,
  ]
> {
  if (itemId === undefined) {
    return $multi(undefined, undefined, undefined, undefined, undefined, undefined)
  }
  const buildItemLink = lib.buildItemLink
  const itemLink = buildItemLink(asPresent(itemId))
  let [isSet, setName, setId, numBonuses, numEquipped, maxEquipped] = checkSet(itemLink)
  if (!isSet) {
    ;[isSet, setName, setId, numBonuses, numEquipped, maxEquipped] = checkNoSetIdSet(itemId)
  }
  return $multi(
    isSet,
    asStringOpt(setName),
    asNumberOpt(setId),
    asNumberOpt(numBonuses),
    asNumberOpt(numEquipped),
    asNumberOpt(maxEquipped)
  )
}
lib.IsSetByItemId = isSetByItemId

function isSetByItemLink(
  this: void,
  itemLink: string | undefined
): LuaMultiReturn<
  [
    boolean | undefined,
    string | undefined,
    number | undefined,
    number | undefined,
    number | undefined,
    number | undefined,
  ]
> {
  let [isSet, setName, setId, numBonuses, numEquipped, maxEquipped] = checkSet(itemLink)
  if (!isSet) {
    ;[isSet, setName, setId, numBonuses, numEquipped, maxEquipped] = checkNoSetIdSet(
      GetItemLinkItemId(asPresent(itemLink))
    )
  }
  return $multi(
    isSet,
    asStringOpt(setName),
    asNumberOpt(setId),
    asNumberOpt(numBonuses),
    asNumberOpt(numEquipped),
    asNumberOpt(maxEquipped)
  )
}
lib.IsSetByItemLink = isSetByItemLink

function isVeteranSet(
  this: void,
  setId: number | undefined,
  itemLink: string | undefined
): boolean | undefined {
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return false
  }
  const setInfo = lib.setInfo
  const noSetIdSets = lib.noSetIdSets
  const gilet = GetItemLinkEquipType
  let isVeteranSetResult: boolean | undefined = false
  if (setId !== undefined && itemLink !== undefined) {
    const setData = asStrRecordEntryOpt(setInfo[setId] ?? noSetIdSets[setId])
    if (setData !== undefined) {
      const veteranData = setData["veteran"]
      if (veteranData !== undefined) {
        if (type(veteranData) === "table") {
          const equipType = gilet(itemLink)
          if (equipType !== undefined) {
            for (const [equipTypeVeteranCheck, isVeteran] of pairs(
              asEquipTypeBoolMap(veteranData)
            )) {
              if (equipTypeVeteranCheck === equipType) {
                return isVeteran
              }
            }
          }
        } else {
          isVeteranSetResult = asBoolean(veteranData)
        }
      }
    }
  }
  return isVeteranSetResult
}
lib.IsVeteranSet = isVeteranSet
