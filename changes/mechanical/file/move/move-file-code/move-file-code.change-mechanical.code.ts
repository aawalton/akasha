import { dirname, extname } from "node:path"
import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { repointed } from "akasha/changes/modules/import-repointing/import-repointing.module.code.ts"
import { renameManifestWays } from "akasha/changes/modules/manifest-ways/manifest-ways.module.code.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { reachesIn } from "akasha/code/workspaces/modules/package-manifest/package-manifest.module.code.ts"
import { manifestsIn } from "akasha/pages/indexes/modules/package-reaching/package-reaching.module.code.ts"
import { importingOf } from "akasha/pages/indexes/modules/path-naming/path-naming.module.code.ts"

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
  const going = await reach(world, MOVE_FILE, { from: given.from, to: given.to })
  if (going.said.refused !== null) return going.said
  const seen = going.world
  const made: FileChange[] = []
  const carried = repointed(seen, { was: given.from, now: given.to, moved })
  if (carried.refused !== null) return carried
  made.push(...carried.edits)
  for (const path of reading.importers) {
    if (seen.textOf(path) === null) {
      return refusing(`\`${path}\` names what moved and could not be read`)
    }
    const said = repointed(seen, { was: path, now: path, moved })
    if (said.refused !== null) return said
    made.push(...said.edits)
  }
  for (const at of manifestsIn(seen.index.everyPath(), seen.index.fileKeysAt())) {
    const held = seen.textOf(at)
    if (held === null) continue
    if (![...reachesIn(dirname(at), held).values()].includes(given.from)) continue
    const said = renameManifestWays({ at, moved }, seen.textOf)
    if (said.refused !== null) return said
    made.push(...said.edits)
  }
  return stating([...going.said.edits, ...made])
}
