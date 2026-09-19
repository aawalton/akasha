import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const FROM = "from"

const APPEND_LINES = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

export type Asked = Readonly<Record<string, string>>

export async function appendLinesFromCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const content = world.textOf(from)
  if (content === null) return refusing(`\`${from}\` holds no text, so there is nothing to append`)
  return (await reach(world, APPEND_LINES, { at, content })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await appendLinesFromCommand(world, given)
}
