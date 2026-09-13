import { basename, join } from "node:path"
import {
  gathered,
  missing,
  refusing,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const TO = "to"

const GONE = "gone"

const CLEARED = "cleared"

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

const MOVE_FILE = "change-mechanical/move-file-of-any-kind"

export type MoveSubagentPageTypeAsked = {
  readonly at: string
  readonly to: string
  readonly gone: string
  readonly cleared: string
}

export async function moveSubagentPageType(
  world: World,
  given: MoveSubagentPageTypeAsked
): Promise<Answer> {
  const emptied = await reach(world, REMOVE_FOLDER, { at: given.cleared })
  if (emptied.said.refused !== null) return emptied.said
  const swept = await reach(emptied.world, REMOVE_FOLDER, { at: given.gone })
  if (swept.said.refused !== null) return swept.said
  const to = join(given.to, basename(given.at))
  const moved = await reach(swept.world, MOVE_FILE, { from: given.at, to })
  if (moved.said.refused !== null) return moved.said
  return gathered([emptied.said, swept.said, moved.said])
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, TO, GONE, CLEARED]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const gone = given[GONE]
  if (gone === undefined) return refusing(missing(GONE))
  const cleared = given[CLEARED]
  if (cleared === undefined) return refusing(missing(CLEARED))
  return await moveSubagentPageType(world, { at, to, gone, cleared })
}
