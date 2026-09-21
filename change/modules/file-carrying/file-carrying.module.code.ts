import { dirname, join } from "node:path"
import {
  type FileChange,
  splicedTo,
  splicing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { repointed } from "akasha/change/modules/import-repointing/import-repointing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { importingOf } from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"
import {
  pageOf,
  partedIn,
  uncommittedNamed,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { bodyFor, nameFor } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"

const TYPED = ".ts"

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

export function importersOf(world: World, moved: ReadonlyMap<string, string>): readonly string[] {
  return importingOf(world.index, moved)
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

function pageAt(path: string): string | null {
  const said = partedIn(path)
  return said === null ? null : join(dirname(path), `${pageOf(said)}${TYPED}`)
}

function respelledOver(world: World, moved: ReadonlyMap<string, string>): readonly FileChange[] {
  const said: FileChange[] = []
  for (const [from, to] of moved) {
    if (!uncommittedNamed(to)) continue
    const was = pageAt(from)
    const page = pageAt(to)
    if (was === null || page === null || nameFor(was) === nameFor(page)) continue
    const text = world.textOf(to) ?? world.textOf(from)
    if (text === null) continue
    const held = loadedFrom(text).value
    if (held === null) continue
    const body = bodyFor(page, held)
    if (body === text) continue
    said.push(...splicing(to, text, [splicedTo(text, body)]))
  }
  return said
}

export function carriedBy(
  world: World,
  moved: ReadonlyMap<string, string>
): readonly FileChange[] | string {
  const importers = importersOf(world, moved)
  const bodies = repointedOver(world, moved, [...moved.keys(), ...importers])
  if (typeof bodies === "string") return bodies
  return [...movesOf(moved), ...bodies, ...respelledOver(world, moved)]
}
