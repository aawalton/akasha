import { reaches } from "@akasha/indexes/reaching"
import { slugOf, textAt, type Value } from "@akasha/pages/page-value"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { readFor, targetsIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_VALUE = "change-mechanical-file-content/add-property-value"

const AT = "at"

const KEY = "key"

const VALUE = "value"

const AFTER = "after"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
}

function singleIn(world: World, value: Value, key: string): boolean {
  const stated = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (stated === null) return false
  const carried = world.index.propertiesIfNamed(slugOf(stated))
  if (carried === null) return false
  const one = carried.find((each) => each.key === key)
  return one !== undefined && !one.many
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
  const single = singleIn(world, read.value, given.key)
  return (await reach(world, ADD_PROPERTY_VALUE, single ? { ...given, single } : given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  const after = given[AFTER]
  return await addPropertyValue(
    world,
    after === undefined ? { at, key, value } : { at, key, value, after }
  )
}
