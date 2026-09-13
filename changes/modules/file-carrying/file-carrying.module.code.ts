import { dirname } from "node:path"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { repointed } from "akasha/changes/modules/import-repointing/import-repointing.module.code.ts"
import { renameManifestWays } from "akasha/changes/modules/manifest-ways/manifest-ways.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { reachesIn } from "akasha/code/workspaces/modules/package-manifest/package-manifest.module.code.ts"
import { manifestsIn } from "akasha/pages/indexes/modules/package-reaching/package-reaching.module.code.ts"
import { importingOf } from "akasha/pages/indexes/modules/path-naming/path-naming.module.code.ts"

export function refusalOver(world: World, moved: ReadonlyMap<string, string>): string | null {
  if (moved.size === 0) return "no path was handed in, so nothing is moved"
  for (const [from, to] of moved) {
    if (from === to) return `\`${to}\` is the path it already sits at`
    if (world.bodyOf(from) === null) return `\`${from}\` holds no body, so nothing is moved`
    if (world.bodyOf(to) !== null) return `\`${to}\` is a body already`
  }
  return null
}

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
    const held = repointed(world, {
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
  const bodies = repointedOver(world, moved, [...moved.keys(), ...importers])
  if (typeof bodies === "string") return bodies
  const ways = manifestsAnew(world, moved)
  if (typeof ways === "string") return ways
  return [...movesOf(moved), ...bodies, ...ways]
}
