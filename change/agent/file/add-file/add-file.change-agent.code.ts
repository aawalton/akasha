import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const BODY = "body"

const ID = "id"

const OLD = "old"

const ADD_FILE_OF_ANY_KIND = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

export type Asked = Readonly<Record<string, string>>

export async function addFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  const carried = { at, body, id: given[ID], old: given[OLD] }
  return (await reach(world, ADD_FILE_OF_ANY_KIND, carried)).said
}

export const takes: readonly string[] = [AT, BODY, ID, OLD]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await addFileCommand(world, given)
}
