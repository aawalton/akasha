import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const CONTENT = "content"

const APPEND_LINES = "change-mechanical-file-content/append-lines"

export type Asked = Readonly<Record<string, string>>

export async function appendLinesCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const content = given[CONTENT]
  if (content === undefined) return refusing(missing(CONTENT))
  return (await reach(world, APPEND_LINES, { at, content })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await appendLinesCommand(world, given)
}
