import {
  asSetIdBoolMap,
  asSetIdLangStringMap,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { asSetIdLangStringOptMap } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
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
    if (allSetIds === undefined || allSetIds === false) {
      return undefined
    }
    for (const [setId, isActive] of pairs(asSetIdBoolMap(allSetIds))) {
      if (isActive === true) {
        const setNamesOfSetId = getSetNames(setId)
        if (setNamesOfSetId !== undefined && setNamesOfSetId !== false) {
          setNames[setId] = setNamesOfSetId
        }
      }
    }
    allSetNamesCached = asSetIdLangStringMap(setNames)
  }
  return safeReturnAPItable(allSetNamesCached)
}
lib.GetAllSetNames = getAllSetNames

function getSetByName(
  this: void,
  setName: string | undefined,
  lang?: string
): LuaMultiReturn<[number | undefined, unknown]> {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return $multi(undefined, undefined)
  }
  const langResolved = lib.LangAllowedCheck(lang)
  const preloaded = lib.setDataPreloaded
  const setNamesNonESO = asSetIdLangStringOptMap(preloaded[SETS_TABLEKEY_SETNAMES_NO_SETID])
  const setNames = asSetIdLangStringOptMap(preloaded[SETS_TABLEKEY_SETNAMES])
  for (const [setId, namesOfSets] of pairs(setNames)) {
    const setNameInLanguageToSearch = namesOfSets[langResolved]
    if (setNameInLanguageToSearch !== undefined && setNameInLanguageToSearch === setName) {
      return $multi(setId, safeReturnAPItable(namesOfSets))
    }
  }
  for (const [setId, namesOfSetsNonESO] of pairs(setNamesNonESO)) {
    const setNameNonESOInLanguageToSearch = namesOfSetsNonESO[langResolved]
    if (
      setNameNonESOInLanguageToSearch !== undefined &&
      setNameNonESOInLanguageToSearch === setName
    ) {
      return $multi(setId, safeReturnAPItable(namesOfSetsNonESO))
    }
  }
  return $multi(undefined, undefined)
}
lib.GetSetByName = getSetByName
