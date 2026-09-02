import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLibSetIdSlots,
  asLibSlots,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import { asTrialSetEntryOpt } from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

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
