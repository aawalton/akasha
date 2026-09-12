import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  afterIn,
  declaresIn,
  holdsIn,
  readFor,
  singleIn,
  spelledIn,
  targetsIn,
  typeIn,
} from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { reaches } from "akasha/pages/indexes/reaching/reaching.module.code.ts"

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
    const named = spelledIn(world, read.value, given.key)
    if (named !== null) {
      return refusing(
        `\`${given.key}\` is a slug, and \`${stated}\` declares that property under the key ` +
          `\`${named}\`, so nothing is put in. Name the key.`
      )
    }
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
  const placed = given.after ?? afterIn(world, read.value, given.key)
  const told = single ? { ...given, single } : { ...given }
  const spelled = holds === null ? told : { ...told, holds }
  const asked = placed === null ? spelled : { ...spelled, after: placed }
  return (await reach(world, ADD_PROPERTY_VALUE, asked)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, KEY, VALUE, AFTER]

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
