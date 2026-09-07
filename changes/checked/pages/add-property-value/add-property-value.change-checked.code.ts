import { reaches } from "@akasha/indexes/reaching"
import {
  readFor,
  targetsIn,
} from "../../../mechanical/pages/change-page-property-relation/change-page-property-relation.change-mechanical.code.ts"
import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_VALUE = "change-mechanical/add-property-value"

const AT = "at"

const KEY = "key"

const VALUE = "value"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
}

export async function addPropertyValue(
  world: World,
  given: AddPropertyValueAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no value is put in`)
  const targets = targetsIn(read.known, read.value, given.key)
  if (targets.length > 0) {
    const reached = reaches(given.value, targets, read.known)
    if ("refused" in reached) {
      return refusing(`\`${given.key}\` names a relation, and ${reached.refused}`)
    }
  }
  return await reach(world, ADD_PROPERTY_VALUE, given)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  return await addPropertyValue(world, { at, key, value })
}
