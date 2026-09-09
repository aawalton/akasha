import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const FROM = "from"

const TO = "to"

const OF = "of"

const MOVE_CODE_EXPORT = "change-mechanical/move-code-export"

export type Asked = Readonly<Record<string, string>>

export async function moveCodeExportCommand(world: World, given: Asked): Promise<Answer> {
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const named = given[OF]
  if (named === undefined) return refusing(missing(OF))
  return (await reach(world, MOVE_CODE_EXPORT, { from, to, of: named })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await moveCodeExportCommand(world, given)
}
