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

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

const MOVE_FILE = "change-mechanical/move-file-of-any-kind"

export type MoveSubagentPageTypeAsked = {
  readonly at: string
  readonly to: string
  readonly gone: string
}

type Swept = {
  readonly said: Answer
  readonly world: World
}

async function sweep(world: World, at: string): Promise<Swept> {
  if ([...world.under(at)].length === 0) return { said: gathered([]), world }
  const said = await reach(world, REMOVE_FOLDER, { at })
  if (said.said.refused !== null) return { said: gathered([]), world }
  return said
}

export async function moveSubagentPageType(
  world: World,
  given: MoveSubagentPageTypeAsked
): Promise<Answer> {
  const swept = await sweep(world, given.gone)
  const to = join(given.to, basename(given.at))
  const moved = await reach(swept.world, MOVE_FILE, { from: given.at, to })
  if (moved.said.refused !== null) return moved.said
  const born = await sweep(moved.world, given.gone)
  return gathered([swept.said, moved.said, born.said])
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, TO, GONE]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const gone = given[GONE]
  if (gone === undefined) return refusing(missing(GONE))
  return await moveSubagentPageType(world, { at, to, gone })
}
