import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { answered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const RENAME_IMPORTS = "change-mechanical-code/rename-imports"

export type RenamePathAsked = {
  readonly from: string
  readonly to: string
}

export async function renamePath(world: World, given: RenamePathAsked): Promise<Answer> {
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  const text = world.textOf(given.from)
  if (text === null) return refusing(`\`${given.from}\` could not be read`)
  if (world.textOf(given.to) !== null) return refusing(`\`${given.to}\` is a body already`)
  const moved = { [given.from]: given.to }
  const reading = importingOf(world.index, new Map(Object.entries(moved)))
  if ("unread" in reading) return refusing(reading.unread)
  const carried = await reach(world, RENAME_IMPORTS, {
    was: given.from,
    now: given.to,
    moved,
  })
  if (carried.said.refused !== null) return carried.said
  const edits: Edit[] = [...carried.said.edits]
  let seen = carried.world
  for (const path of reading.importers) {
    const held = seen.textOf(path)
    if (held === null) return refusing(`\`${path}\` names what moved and could not be read`)
    const said = await reach(seen, RENAME_IMPORTS, { was: path, now: path, moved })
    if (said.said.refused !== null) return said.said
    for (const one of said.said.edits) {
      if (one.body !== held) edits.push(one)
    }
    seen = said.world
  }
  return answered(edits)
}

export async function runChange(world: World, given: RenamePathAsked): Promise<Answer> {
  return await renamePath(world, given)
}
