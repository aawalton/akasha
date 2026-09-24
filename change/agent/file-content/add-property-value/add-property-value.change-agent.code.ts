import { addPropertyValue as addPropertyValueMechanical } from "akasha/change/mechanical/file-content/add/add-property-value/add-property-value.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  addressedIn,
  afterIn,
  declaresIn,
  holdsIn,
  readFor,
  singleIn,
  spelledIn,
  typeIn,
} from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_VALUE =
  `${changeMechanicalFileContent.slug}/${addPropertyValueMechanical.slug}` as const

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
  const addressed = addressedIn(read.known, read.value, given.key, given.value)
  if ("refused" in addressed) return refusing(addressed.refused)
  const single = singleIn(world, read.value, given.key)
  const holds = holdsIn(world, read.value, given.key)
  const placed = given.after ?? afterIn(world, read.value, given.key)
  const valued = { ...given, value: addressed.value }
  const told = single ? { ...valued, single } : valued
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
