import { extname } from "node:path"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { refusing, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer, FileChange } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { repointed } from "akasha/change/modules/import-repointing/import-repointing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { importingOf } from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"

const MOVE_FILE = `${changeMechanicalFile.slug}/${moveFile.slug}` as const

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly from: string
  readonly to: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!CODE.has(extname(given.to))) {
    return refusing(`\`${given.to}\` is under no TypeScript name, so this change lands nothing`)
  }
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  const text = world.textOf(given.from)
  if (text === null) return refusing(`\`${given.from}\` could not be read`)
  if (world.textOf(given.to) !== null) return refusing(`\`${given.to}\` is a body already`)
  const moved = { [given.from]: given.to }
  const importers = importingOf(world.index, new Map(Object.entries(moved)))
  const going = await reach(world, MOVE_FILE, { from: given.from, to: given.to })
  if (going.said.refused !== null) return going.said
  const seen = going.world
  const made: FileChange[] = []
  const carried = repointed(seen, { was: given.from, now: given.to, moved })
  if (carried.refused !== null) return carried
  made.push(...carried.edits)
  for (const path of importers) {
    if (seen.textOf(path) === null) {
      return refusing(`\`${path}\` names what moved and could not be read`)
    }
    const said = repointed(seen, { was: path, now: path, moved })
    if (said.refused !== null) return said
    made.push(...said.edits)
  }
  return stating([...going.said.edits, ...made])
}
