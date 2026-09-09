import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const OLD = "old"

const NEW = "new"

const CHANGE_FILE = "change-mechanical-file-content/change-file-content-of-any-kind"

export type Asked = Readonly<Record<string, string>>

export async function changeFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const old = given[OLD]
  if (old === undefined) return refusing(missing(OLD))
  const becomes = given[NEW]
  if (becomes === undefined) return refusing(missing(NEW))
  return (await reach(world, CHANGE_FILE, { at, old, new: becomes })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await changeFileCommand(world, given)
}
