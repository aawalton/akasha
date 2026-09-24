import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyValue as removePropertyValueMechanical } from "akasha/change/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  listFieldIn,
  readFor,
} from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_PROPERTY_VALUE =
  `${changeMechanicalFileContent.slug}/${removePropertyValueMechanical.slug}` as const

const AT = "at"

const KEY = "key"

const VALUE = "value"

const WHERE = "where"

const IS = "is"

const FIELD = "field"

const TOGETHER =
  "`where`, `is` and `field` are stated together or not at all, so no value is taken out"

export type RemovePropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly where?: string
  readonly is?: string
  readonly field?: string
}

export async function removePropertyValue(
  world: World,
  given: RemovePropertyValueAsked
): Promise<Answer> {
  const { where, is, field } = given
  const inRecord = where !== undefined && is !== undefined && field !== undefined
  if (!inRecord && (where !== undefined || is !== undefined || field !== undefined)) {
    return refusing(TOGETHER)
  }
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no value is taken out`)
  if (inRecord) {
    const found = listFieldIn(world, read.known, read.value, given.key, field)
    if ("refused" in found) return refusing(`${found.refused}, so no value is taken out`)
  }
  return (await reach(world, REMOVE_PROPERTY_VALUE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, KEY, VALUE, WHERE, IS, FIELD]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  const asked: Record<string, string> = { at, key, value }
  for (const one of [WHERE, IS, FIELD]) {
    const said = given[one]
    if (said !== undefined) asked[one] = said
  }
  return await removePropertyValue(world, asked as RemovePropertyValueAsked)
}
