import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import type { Naming } from "@akasha/code-system/code-specifier"
import { reachesIn, reachingOver } from "@akasha/code-system/package-manifest"
import type { Value } from "@akasha/pages-system/page-value"
import {
  type FilePropertiesBy,
  fileKeysAt,
  pathsOf,
  under,
} from "../entries/index-entries.module.code.ts"
import { everyPath, importersIn } from "../reading/index-reading.module.code.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"
import { readingOf } from "../surface/index-surface.module.code.ts"

const MANIFEST = "manifest"

const HELD = new Map<string, Naming>()

export type Body = (path: string) => string | null

export function manifestsAmong(
  paths: Iterable<string>,
  fileName: string | null
): readonly string[] {
  if (fileName === null) return []
  return [...paths].filter((one) => basename(one) === fileName)
}

export function bodiesAt(repo: string): Body {
  return (path) => {
    const at = join(repo, path)
    return existsSync(at) ? readFileSync(at, "utf8") : null
  }
}

export function reachingOf(at: Iterable<string>, bodyAt: Body): Naming {
  const held: ReadonlyMap<string, string>[] = []
  for (const one of at) {
    const text = bodyAt(one)
    if (text === null) continue
    held.push(reachesIn(dirname(one), text))
  }
  return reachingOver(held)
}

export function manifestsIn(
  paths: Iterable<string>,
  fileProperties: ReadonlyMap<string, string | null>
): readonly string[] {
  return manifestsAmong(paths, fileProperties.get(MANIFEST) ?? null)
}

export function reachingIn(
  paths: Iterable<string>,
  fileProperties: ReadonlyMap<string, string | null>,
  bodyAt: Body
): Naming {
  return reachingOf(manifestsIn(paths, fileProperties), bodyAt)
}

export function reachingAt(given: string | Reading, bodyAt: Body): Naming {
  return reachingIn(everyPath(given), fileKeysAt(given), bodyAt)
}

export function reachingFor(root: string): Naming {
  const found = HELD.get(root)
  if (found !== undefined) return found
  const said = reachingAt(root, bodiesAt(root))
  HELD.set(root, said)
  return said
}

export type Page = {
  readonly path: string
  readonly value: Value
}

export type Leaving = {
  readonly path: string
  readonly now: Value | null
}

export type Carried = {
  readonly path: string
  readonly after: string | null
}

export function bodiesOver(repo: string, carried: ReadonlyMap<string, string | null>): Body {
  const onDisk = bodiesAt(repo)
  return (path) => (carried.has(path) ? (carried.get(path) ?? null) : onDisk(path))
}

export function reachingBuilt(
  held: readonly Page[],
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy
): Naming {
  const claimed = held.flatMap((one) => pathsOf(one.value, one.path, repo, filedBy))
  return reachingIn(claimed, fileProperties, bodiesAt(repo))
}

export function reachingSettled(
  given: string | Reading,
  held: readonly Leaving[],
  carried: readonly Carried[],
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy
): Naming {
  const bodies = new Map(carried.map((one) => [under(repo, one.path), one.after]))
  const claimed = held.flatMap((one) =>
    one.now === null ? [under(repo, one.path)] : pathsOf(one.now, one.path, repo, filedBy)
  )
  return reachingIn(
    [...everyPath(given), ...bodies.keys(), ...claimed],
    fileProperties,
    bodiesOver(repo, bodies)
  )
}

export function landedElsewhere(was: Naming, now: Naming): readonly string[] {
  const said: string[] = []
  for (const [specifier, before] of was) {
    if (now.get(specifier) !== before) said.push(before)
  }
  return said
}

export function importersAmong(
  given: string | Reading,
  landed: readonly string[]
): ReadonlySet<string> {
  const reading = readingOf(given)
  const said = new Set<string>()
  for (const one of landed) {
    for (const path of importersIn(reading, one)) said.add(path)
  }
  return said
}

export type Turning = {
  readonly path: string
  readonly before: string | null
  readonly was: Value | null
}

export type Reread = {
  readonly path: string
  readonly before: string
  readonly after: string
}

export type Rereading = {
  readonly was: Naming
  readonly reread: readonly Reread[]
}

export function rereadOver(
  given: string | Reading,
  turning: readonly Turning[],
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy,
  now: Naming
): Rereading {
  const owned = new Set(turning.map((one) => under(repo, one.path)))
  if (manifestsIn(owned, fileProperties).length === 0) return { was: now, reread: [] }
  const was = reachingSettled(
    given,
    turning.map((one) => ({ path: one.path, now: one.was })),
    turning.map((one) => ({ path: one.path, after: one.before })),
    repo,
    fileProperties,
    filedBy
  )
  const bodyAt = bodiesAt(repo)
  const reread: Reread[] = []
  for (const path of importersAmong(given, landedElsewhere(was, now))) {
    if (owned.has(path)) continue
    const body = bodyAt(path)
    if (body === null) continue
    reread.push({ path, before: body, after: body })
  }
  return { was, reread }
}
