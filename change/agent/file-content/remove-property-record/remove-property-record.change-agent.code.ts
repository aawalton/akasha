import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyRecord as removePropertyRecordMechanical } from "akasha/change/mechanical/file-content/remove/remove-property-record/remove-property-record.change-mechanical-file-content.ts"
import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { readFor } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_PROPERTY_RECORD =
  `${changeMechanicalFileContent.slug}/${removePropertyRecordMechanical.slug}` as const

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

export const takes: readonly string[] = [AT, KEY, WHERE, IS]

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
