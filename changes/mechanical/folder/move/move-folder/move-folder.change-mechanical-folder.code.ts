import { dirname, join, relative } from "node:path"
import { reachesIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import { importingOf } from "../../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { refusing, stating } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
} from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const CHANGE_IMPORTS = "change-mechanical-file-content/change-imports"

const CHANGE_MANIFEST_WAYS = "change-mechanical-file-content/change-manifest-ways"

const MOVE_FILE = "change-mechanical-file/move-file"

const OUTSIDE = ".."

export type Asked = {
  readonly from: string
  readonly to: string
}

type Moved = { readonly moved: ReadonlyMap<string, string> } | { readonly refused: string }

function underneath(world: World, at: string): readonly string[] {
  return [...world.under(at)].sort()
}

function movedInto(world: World, at: string, to: string, under: readonly string[]): Moved {
  const held = new Set(world.under(to))
  const said = new Map<string, string>()
  for (const one of under) {
    const next = join(to, relative(at, one))
    if (held.has(next)) return { refused: `\`${next}\` is a body already` }
    said.set(one, next)
  }
  return { moved: said }
}

function waysNaming(world: World, at: string, moved: ReadonlyMap<string, string>): boolean {
  const held = world.textOf(at)
  if (held === null) return false
  for (const one of reachesIn(dirname(at), held).values()) {
    if (moved.has(one)) return true
  }
  return false
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (given.from === given.to) {
    return refusing(`\`${given.to}\` is the folder those files sit under`)
  }
  const under = underneath(world, given.from)
  if (under.length === 0) {
    return refusing(`\`${given.from}\` holds no file, so nothing is carried`)
  }
  if (!relative(given.from, given.to).startsWith(OUTSIDE)) {
    return refusing(`\`${given.to}\` sits under \`${given.from}\`, so the folder is not carried`)
  }
  const said = movedInto(world, given.from, given.to, under)
  if ("refused" in said) return refusing(said.refused)
  const moved = said.moved
  const reading = importingOf(world.index, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const carried = Object.fromEntries(moved)
  const manifests = manifestsIn(world.index.everyPath(), world.index.fileKeysAt())
  const edits: FileChange[] = []
  let seen = world
  for (const [one, next] of moved) {
    const carrying = await reach(seen, MOVE_FILE, { from: one, to: next })
    if (carrying.said.refused !== null) return carrying.said
    edits.push(...carrying.said.edits)
    seen = carrying.world
    const answer = await reach(seen, CHANGE_IMPORTS, { was: one, now: next, moved: carried })
    if (answer.said.refused !== null) return answer.said
    edits.push(...answer.said.edits)
    seen = answer.world
  }
  for (const path of reading.importers) {
    if (moved.has(path)) continue
    if (seen.textOf(path) === null) {
      return refusing(`\`${path}\` names a path that moved and could not be read`)
    }
    const answer = await reach(seen, CHANGE_IMPORTS, { was: path, now: path, moved: carried })
    if (answer.said.refused !== null) return answer.said
    edits.push(...answer.said.edits)
    seen = answer.world
  }
  for (const at of manifests) {
    if (moved.has(at) || !waysNaming(seen, at, moved)) continue
    const answer = await reach(seen, CHANGE_MANIFEST_WAYS, { at, moved: carried })
    if (answer.said.refused !== null) return answer.said
    edits.push(...answer.said.edits)
    seen = answer.world
  }
  return stating(edits)
}
