import { asBoolean } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asSetIdBoolMap,
  asSetIdLangStringMap,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import {
  SETS_TABLEKEY_SETNAMES,
  SETS_TABLEKEY_SETNAMES_NO_SETID,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

let allSetNamesCached: { [setId: number]: { [lang: string]: string } } | undefined

type PreloadedSetNames = { [setId: number]: { [lang: string]: string } }

function getSetName(this: void, setId: number | undefined, lang?: string): unknown {
  if (setId === undefined) {
    return undefined
  }
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const langResolved = lib.LangAllowedCheck(lang)
  let setNames: PreloadedSetNames = {}
  if (
    allSetNamesCached === undefined ||
    allSetNamesCached[setId] === undefined ||
    allSetNamesCached[setId]?.[langResolved] === undefined
  ) {
    const isNoESOSet = lib.IsNoESOSet
    const preloaded = lib.setDataPreloaded
    if (isNoESOSet(setId)) {
      setNames = asSetIdLangStringMap(preloaded[SETS_TABLEKEY_SETNAMES_NO_SETID])
    } else {
      setNames = asSetIdLangStringMap(preloaded[SETS_TABLEKEY_SETNAMES])
    }
  } else {
    setNames = allSetNamesCached
  }
  if (setNames[setId] === undefined || setNames[setId]?.[langResolved] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setNames[setId]?.[langResolved])
}
lib.GetSetName = getSetName

function getSetNames(this: void, setId: number | undefined): unknown {
  if (setId === undefined) {
    return undefined
  }
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  let setNames: PreloadedSetNames = {}
  if (allSetNamesCached === undefined || allSetNamesCached[setId] === undefined) {
    const isNoESOSet = lib.IsNoESOSet
    const preloaded = lib.setDataPreloaded
    if (isNoESOSet(setId)) {
      setNames = asSetIdLangStringMap(preloaded[SETS_TABLEKEY_SETNAMES_NO_SETID])
    } else {
      setNames = asSetIdLangStringMap(preloaded[SETS_TABLEKEY_SETNAMES])
    }
  } else {
    setNames = allSetNamesCached
  }
  if (setNames[setId] === undefined) {
    return undefined
  }
  return safeReturnAPItable(setNames[setId])
}
lib.GetSetNames = getSetNames

function getAllSetNames(this: void): unknown {
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  if (allSetNamesCached === undefined) {
    const setNames: { [setId: number]: unknown } = {}
    const getAllSetIds = lib.GetAllSetIds
    const allSetIds = getAllSetIds()
    if (allSetIds === undefined || asBoolean(allSetIds) === false) {
      return undefined
    }
    for (const [setId, isActive] of pairs(asSetIdBoolMap(allSetIds))) {
      if (isActive === true) {
        const setNamesOfSetId = getSetNames(setId)
        if (setNamesOfSetId !== undefined && asBoolean(setNamesOfSetId) !== false) {
          setNames[setId] = setNamesOfSetId
        }
      }
    }
    allSetNamesCached = asSetIdLangStringMap(setNames)
  }
  return safeReturnAPItable(allSetNamesCached)
}
lib.GetAllSetNames = getAllSetNames
