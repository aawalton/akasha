import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const FROM = "from"

const APPEND_LINES = "change-mechanical-file-content/append-lines"

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
