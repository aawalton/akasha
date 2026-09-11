import { dirname } from "node:path"
import { renameManifestWays } from "akasha/changes/mechanical/file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "akasha/changes/mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { reachesIn } from "akasha/code/package-manifest/package-manifest.module.code.ts"
import { manifestsIn } from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import { importingOf } from "akasha/pages/indexes/path-naming/path-naming.module.code.ts"

export function movesOf(moved: ReadonlyMap<string, string>): readonly FileChange[] {
  const said: FileChange[] = []
  for (const [from, to] of moved) said.push({ kind: "move", pathFrom: from, pathTo: to })
  return said
}

export function importersOf(
  world: World,
  moved: ReadonlyMap<string, string>
): readonly string[] | string {
  const reading = importingOf(world.index, moved)
  return "unread" in reading ? reading.unread : reading.importers
}

export function repointedOver(
  world: World,
  moved: ReadonlyMap<string, string>,
  over: Iterable<string>
): readonly FileChange[] | string {
  const landing = Object.fromEntries(moved)
  const said: FileChange[] = []
  for (const path of over) {
    const held = changeImports(world, {
      was: path,
      now: moved.get(path) ?? path,
      moved: landing,
    })
    if (held.refused !== null) return held.refused
    said.push(...held.edits)
  }
  return said
}

export function manifestsAnew(
  world: World,
  moved: ReadonlyMap<string, string>
): readonly FileChange[] | string {
  const over = Object.fromEntries(moved)
  const said: FileChange[] = []
  for (const at of manifestsIn(world.index.everyPath(), world.index.fileKeysAt())) {
    const text = world.textOf(at)
    if (text === null) continue
    if (![...reachesIn(dirname(at), text).values()].some((one) => moved.has(one))) continue
    const held = renameManifestWays({ at, moved: over }, world.textOf)
    if (held.refused !== null) return held.refused
    said.push(...held.edits.filter((one) => one.kind !== "move"))
  }
  return said
}

export function carriedBy(
  world: World,
  moved: ReadonlyMap<string, string>
): readonly FileChange[] | string {
  const importers = importersOf(world, moved)
  if (typeof importers === "string") return importers
  const repointed = repointedOver(world, moved, [...moved.keys(), ...importers])
  if (typeof repointed === "string") return repointed
  const ways = manifestsAnew(world, moved)
  if (typeof ways === "string") return ways
  return [...movesOf(moved), ...repointed, ...ways]
}
