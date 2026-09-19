import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { moveCodeExport } from "akasha/change/mechanical/file-content/move/move-code-export/move-code-export.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const FROM = "from"

const TO = "to"

const OF = "of"

const MOVE_CODE_EXPORT = `${changeMechanical.slug}/${moveCodeExport.slug}` as const

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

export const takes: readonly string[] = [FROM, TO, OF]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await moveCodeExportCommand(world, given)
}
