import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const CONTENT = "content"

const APPEND_LINES = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

export type Asked = Readonly<Record<string, string>>

export async function appendLinesCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const content = given[CONTENT]
  if (content === undefined) return refusing(missing(CONTENT))
  return (await reach(world, APPEND_LINES, { at, content })).said
}

export const takes: readonly string[] = [AT, CONTENT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await appendLinesCommand(world, given)
}
