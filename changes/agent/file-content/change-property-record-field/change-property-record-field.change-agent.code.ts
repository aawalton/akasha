import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { readFor } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const CHANGE_PROPERTY_RECORD_FIELD = "change-mechanical-file-content/change-property-record-field"

const AT = "at"

const KEY = "key"

const WHERE = "where"

const IS = "is"

const FIELD = "field"

const TO = "to"

export type ChangePropertyRecordFieldAsked = {
  readonly at: string
  readonly key: string
  readonly where: string
  readonly is: string
  readonly field: string
  readonly to: string
}

export async function changePropertyRecordField(
  world: World,
  given: ChangePropertyRecordFieldAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no field is stated`)
  return (await reach(world, CHANGE_PROPERTY_RECORD_FIELD, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const where = given[WHERE]
  if (where === undefined) return refusing(missing(WHERE))
  const is = given[IS]
  if (is === undefined) return refusing(missing(IS))
  const field = given[FIELD]
  if (field === undefined) return refusing(missing(FIELD))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changePropertyRecordField(world, { at, key, where, is, field, to })
}
