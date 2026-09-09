import { dirname, extname } from "node:path"
import { reachesIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import { importingOf } from "../../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { refusing, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer, FileChange } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const CHANGE_IMPORTS = "change-mechanical-file-content/change-imports"

const CHANGE_MANIFEST_WAYS = "change-mechanical-file-content/change-manifest-ways"

const MOVE_FILE = "change-mechanical-file/move-file"

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
  const reading = importingOf(world.index, new Map(Object.entries(moved)))
  if ("unread" in reading) return refusing(reading.unread)
  const carrying = await reach(world, MOVE_FILE, { from: given.from, to: given.to })
  if (carrying.said.refused !== null) return carrying.said
  const carried = await reach(carrying.world, CHANGE_IMPORTS, {
    was: given.from,
    now: given.to,
    moved,
  })
  if (carried.said.refused !== null) return carried.said
  const edits: FileChange[] = [...carrying.said.edits, ...carried.said.edits]
  let seen = carried.world
  for (const path of reading.importers) {
    const held = seen.textOf(path)
    if (held === null) return refusing(`\`${path}\` names what moved and could not be read`)
    const said = await reach(seen, CHANGE_IMPORTS, { was: path, now: path, moved })
    if (said.said.refused !== null) return said.said
    edits.push(...said.said.edits)
    seen = said.world
  }
  for (const at of manifestsIn(seen.index.everyPath(), seen.index.fileKeysAt())) {
    const held = seen.textOf(at)
    if (held === null) continue
    if (![...reachesIn(dirname(at), held).values()].includes(given.from)) continue
    const said = await reach(seen, CHANGE_MANIFEST_WAYS, { at, moved })
    if (said.said.refused !== null) return said.said
    edits.push(...said.said.edits)
    seen = said.world
  }
  return stating(edits)
}
