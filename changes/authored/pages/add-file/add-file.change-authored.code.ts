import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const BODY = "body"

const ADD_FILE = "change-mechanical/add-file"

export type Asked = Readonly<Record<string, string>>

export async function addFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  return await reach(world, ADD_FILE, { at, body })
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await addFileCommand(world, given)
}
