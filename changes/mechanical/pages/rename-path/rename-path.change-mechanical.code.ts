import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { answered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { repointed } from "../repoint-imports/repoint-imports.change-mechanical.code.ts"

export type RenamePathAsked = {
  readonly from: string
  readonly to: string
}

export function renamePath(world: World, given: RenamePathAsked): Answer {
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  const text = world.textOf(given.from)
  if (text === null) return refusing(`\`${given.from}\` could not be read`)
  if (world.textOf(given.to) !== null) return refusing(`\`${given.to}\` is a body already`)
  const moved = new Map([[given.from, given.to]])
  const reading = importingOf(world.index, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const edits: Edit[] = [...repointed(given.from, given.to, text, moved).edits]
  for (const path of reading.importers) {
    const held = world.textOf(path)
    if (held === null) return refusing(`\`${path}\` names what moved and could not be read`)
    for (const one of repointed(path, path, held, moved).edits) {
      if (one.body !== held) edits.push(one)
    }
  }
  return answered(edits)
}

export function runChange(world: World, given: RenamePathAsked): Answer {
  return renamePath(world, given)
}
