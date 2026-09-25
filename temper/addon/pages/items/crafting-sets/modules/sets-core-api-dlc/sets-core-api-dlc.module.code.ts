import {
  asNumber,
  asNumberOpt,
  asPresent,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { asIndexStringMapOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-dlc/eso-lib-sets-dlc.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

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
    (DLC_ITERATION_END !== undefined && dlcId >= DLC_ITERATION_END) || false
  return wasAddedWithCurrentDLC
}
lib.IsCurrentDLC = isCurrentDLC

function getAllDLCIds(this: void): unknown {
  return safeReturnAPItable(lib.allowedDLCIds)
}
lib.GetAllDLCIds = getAllDLCIds

function getDLCType(this: void, setId: number | undefined): number | undefined {
  const dlcId = asNumberOpt(getDLCId(setId))
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
