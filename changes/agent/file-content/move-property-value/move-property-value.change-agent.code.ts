import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { readFor } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const MOVE_PROPERTY_VALUE = "change-mechanical-file-content/move-property-value"

const AT = "at"

const KEY = "key"

const FROM = "from"

const WHERE = "where"

const IS = "is"

const TO = "to"

const ONTO = "onto"

const WHOLE = /^\d+$/

const NAMED =
  "`from` names the value by the place it sits at and `where` with `is` names it by a field" +
  " it states, and one call names the value one way"

const LANDED =
  "`to` names the place the value goes to and `onto` names it by the value already holding" +
  " it, and one call names that place one way"

const BOTH = "`from` and `where` each name a value, and one call names one value"

const BY_FIELD =
  "`onto` names the value already holding the place by the field `where` names, so a call" +
  " saying `onto` says `where` and `is` as well"

function noPlace(key: string, said: string): string {
  return `\`${key}\` names a place counted from 1, and \`${said}\` is no whole number`
}

export type MovePropertyValueAsked = { readonly at: string; readonly key: string } & (
  | { readonly from: number; readonly to: number }
  | { readonly where: string; readonly is: string; readonly to: number }
  | { readonly where: string; readonly is: string; readonly onto: string }
)

export async function movePropertyValue(
  world: World,
  given: MovePropertyValueAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no value is carried`)
  return (await reach(world, MOVE_PROPERTY_VALUE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, KEY, FROM, WHERE, IS, TO, ONTO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const from = given[FROM]
  const where = given[WHERE]
  const is = given[IS]
  const to = given[TO]
  const onto = given[ONTO]
  if (from !== undefined && !WHOLE.test(from)) return refusing(noPlace(FROM, from))
  if (to !== undefined && !WHOLE.test(to)) return refusing(noPlace(TO, to))
  if (from !== undefined && where !== undefined) return refusing(BOTH)
  if (where !== undefined && is !== undefined) {
    if (onto !== undefined) return await movePropertyValue(world, { at, key, where, is, onto })
    if (to === undefined) return refusing(LANDED)
    return await movePropertyValue(world, { at, key, where, is, to: Number(to) })
  }
  if (from === undefined) return refusing(NAMED)
  if (onto !== undefined) return refusing(BY_FIELD)
  if (to === undefined) return refusing(LANDED)
  return await movePropertyValue(world, { at, key, from: Number(from), to: Number(to) })
}
