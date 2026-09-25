import {
  asGetSetsOfClassIdFn,
  asLibSlots,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const getSetsOfClassId = asGetSetsOfClassIdFn(asLibSlots(lib)["_getSetsOfClassId"])

function getClassSets(this: void, classId: number | undefined): unknown {
  if (classId === undefined) {
    return undefined
  }
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return undefined
  }
  return safeReturnAPItable(getSetsOfClassId(classId))
}
lib.GetClassSets = getClassSets

function getAllClassSets(this: void): unknown {
  if (!lib.checkIfSetsAreLoadedProperly()) {
    return false
  }
  return safeReturnAPItable(lib.classSets)
}
lib.GetAllClassSets = getAllClassSets
