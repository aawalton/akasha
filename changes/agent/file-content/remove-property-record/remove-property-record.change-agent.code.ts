import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { readFor } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const REMOVE_PROPERTY_RECORD = "change-mechanical-file-content/remove-property-record"

const AT = "at"

const KEY = "key"

const WHERE = "where"

const IS = "is"

export type RemovePropertyRecordAsked = {
  readonly at: string
  readonly key: string
  readonly where: string
  readonly is: string
}

export async function removePropertyRecord(
  world: World,
  given: RemovePropertyRecordAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no record is taken out`)
  return (await reach(world, REMOVE_PROPERTY_RECORD, given)).said
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
  return await removePropertyRecord(world, { at, key, where, is })
}
