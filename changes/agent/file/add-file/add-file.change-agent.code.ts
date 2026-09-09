import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const BODY = "body"

const ID = "id"

const ADD_FILE_OF_ANY_KIND = "change-mechanical/add-file-of-any-kind"

export type Asked = Readonly<Record<string, string>>

export async function addFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  return (await reach(world, ADD_FILE_OF_ANY_KIND, { at, body, id: given[ID] })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await addFileCommand(world, given)
}
