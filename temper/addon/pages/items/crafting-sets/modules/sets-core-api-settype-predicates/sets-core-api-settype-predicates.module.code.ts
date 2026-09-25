import {
  asNumberOpt,
  asPresent,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { SETS_TABLEKEY_SETTYPE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import {
  asLangStringMapOpt,
  asLibSetIdSlots,
  asLibSlots,
  asStrRecordEntryOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { asTrialSetEntryOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

type SetIdTable = { [setId: number]: unknown }
function setTypeTable(this: void, name: string): SetIdTable {
  return asPresent(asLibSetIdSlots(lib)[name])
}

function isCraftedSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("craftedSets")[setId] !== undefined
}
lib.IsCraftedSet = isCraftedSet
asLibSlots(lib)["_isCraftedSet"] = isCraftedSet

function isMonsterSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("monsterSets")[setId] !== undefined
}
lib.IsMonsterSet = isMonsterSet

function isDungeonSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("dungeonSets")[setId] !== undefined
}
lib.IsDungeonSet = isDungeonSet

function isTrialSet(
  this: void,
  setId: number | undefined
): LuaMultiReturn<[boolean | undefined, boolean | undefined]> {
  if (setId === undefined) {
    return $multi(undefined, undefined)
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return $multi(undefined, undefined)
  }
  const trialSetData = asTrialSetEntryOpt(setTypeTable("trialSets")[setId]) ?? false
  let isTrialSetResult = false
  let isMultiTrialSet = false
  if (trialSetData !== false) {
    isTrialSetResult = true
    if (trialSetData.multiTrialSet !== undefined) {
      isMultiTrialSet = true
    }
  }
  return $multi(isTrialSetResult, isMultiTrialSet)
}
lib.IsTrialSet = isTrialSet

function isArenaSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("arenaSets")[setId] !== undefined
}
lib.IsArenaSet = isArenaSet

function isOverlandSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("overlandSets")[setId] !== undefined
}
lib.IsOverlandSet = isOverlandSet

function isCyrodiilSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("cyrodiilSets")[setId] !== undefined
}
lib.IsCyrodiilSet = isCyrodiilSet

function isBattlegroundSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("battlegroundSets")[setId] !== undefined
}
lib.IsBattlegroundSet = isBattlegroundSet

function isImperialCitySet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("imperialCitySets")[setId] !== undefined
}
lib.IsImperialCitySet = isImperialCitySet

function isSpecialSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("specialSets")[setId] !== undefined
}
lib.IsSpecialSet = isSpecialSet

function isDailyRandomDungeonAndImperialCityRewardSet(
  this: void,
  setId: number | undefined
): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("dailyRandomDungeonAndImperialCityRewardSets")[setId] !== undefined
}
lib.IsDailyRandomDungeonAndImperialCityRewardSet = isDailyRandomDungeonAndImperialCityRewardSet

function isMythicSet(this: void, setId: number | undefined): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  return setTypeTable("mythicSets")[setId] !== undefined
}
lib.IsMythicSet = isMythicSet

function isClassSet(this: void, setId: number | undefined, classId?: number): boolean | undefined {
  if (setId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }

  const classSets = asPresent(lib.classSets)
  const classSetData = classSets[setId]
  if (classSetData === undefined) {
    return false
  }

  if (classId !== undefined) {
    if (classSetData.classId !== undefined) {
      return classSetData.classId === classId
    }
    return false
  }
  return true
}
lib.IsClassSet = isClassSet

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
  return asNumberOpt(safeReturnAPItable(setData[SETS_TABLEKEY_SETTYPE]))
}
lib.GetSetType = getSetType

function getSetTypeName(
  this: void,
  setsSetType: number | undefined,
  lang?: string
): string | undefined {
  if (setsSetType === undefined) {
    return undefined
  }
  const langResolved = lib.LangAllowedCheck(lang)
  const allowedSetsSetTypes = lib.allowedSetTypes
  const allowedSetType = allowedSetsSetTypes[setsSetType] ?? false
  if (!allowedSetType) {
    return undefined
  }
  let setTypeName: string | undefined
  const setsSetTypeNames = lib.setTypesToName
  const setTypeNameAllLang = asLangStringMapOpt(setsSetTypeNames[setsSetType])
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
