import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { readFor } from "../../../modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_RECORD = "change-mechanical-file-content/add-property-record"

const AT = "at"

const KEY = "key"

const RECORD = "record"

const AFTER = "after"

export type AddPropertyRecordAsked = {
  readonly at: string
  readonly key: string
  readonly record: string
  readonly after?: string
}

export async function addPropertyRecord(
  world: World,
  given: AddPropertyRecordAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no record is put in`)
  return (await reach(world, ADD_PROPERTY_RECORD, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const record = given[RECORD]
  if (record === undefined) return refusing(missing(RECORD))
  const after = given[AFTER]
  return await addPropertyRecord(
    world,
    after === undefined ? { at, key, record } : { at, key, record, after }
  )
}
