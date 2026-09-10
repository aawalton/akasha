import { reaches } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  declaresIn,
  holdsIn,
  readFor,
  singleIn,
  targetsIn,
  typeIn,
} from "../../../modules/page-knowing/page-knowing.module.code.ts"
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

export async function addPropertyValue(
  world: World,
  given: AddPropertyValueAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no value is put in`)
  const stated = typeIn(read.value)
  if (stated !== null && declaresIn(world, read.value, given.key) === false) {
    return refusing(
      `\`${given.key}\` is no property \`${stated}\` declares, so nothing is put in. ` +
        `A field inside a record is reached through the record rather than as a key of its own.`
    )
  }
  const targets = targetsIn(read.known, read.value, given.key)
  if (targets.length > 0) {
    const reached = reaches(given.value, targets, read.known)
    if ("refused" in reached) {
      return refusing(`\`${given.key}\` names a relation, and ${reached.refused}`)
    }
  }
  const single = singleIn(world, read.value, given.key)
  const holds = holdsIn(world, read.value, given.key)
  const asked = single ? { ...given, single } : { ...given }
  return (await reach(world, ADD_PROPERTY_VALUE, holds === null ? asked : { ...asked, holds })).said
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
