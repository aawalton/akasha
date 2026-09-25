import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Naming } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import {
  reachesIn,
  reachingOver,
} from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import type { FilePropertiesBy } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  pathsOf,
  under,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { carryingOf } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { importersOf } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const WORKSPACE_MANIFEST = "workspace-manifest"

const SEPARATOR = "/"

export type Body = (path: string) => string | null

function namesFile(path: string, fileName: string): boolean {
  if (!path.endsWith(fileName)) return false
  const at = path.length - fileName.length
  return at === 0 || path[at - 1] === SEPARATOR
}

export function manifestsAmong(
  paths: Iterable<string>,
  fileName: string | null
): readonly string[] {
  if (fileName === null) return []
  const said: string[] = []
  for (const one of paths) {
    if (namesFile(one, fileName)) said.push(one)
  }
  return said
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

function manifestsIn(
  paths: Iterable<string>,
  fileProperties: ReadonlyMap<string, string | null>
): readonly string[] {
  return manifestsAmong(paths, fileProperties.get(WORKSPACE_MANIFEST) ?? null)
}

function besideAt(path: string, fileName: string): string {
  const at = dirname(path)
  return at === "." ? fileName : `${at}/${fileName}`
}

export function manifestsBeside(
  given: string | Reading,
  fileProperties: ReadonlyMap<string, string | null>
): readonly string[] {
  const fileName = fileProperties.get(WORKSPACE_MANIFEST) ?? null
  if (fileName === null) return []
  const found = new Set<string>()
  for (const [slug, named] of fileProperties) {
    if (named !== fileName) continue
    const held = carryingOf(given, slug)
    if ("refused" in held) continue
    for (const one of held.carrying) found.add(besideAt(one.path, fileName))
  }
  return [...found].sort()
}

export function reachingIn(
  paths: Iterable<string>,
  fileProperties: ReadonlyMap<string, string | null>,
  bodyAt: Body
): Naming {
  return reachingOf(manifestsIn(paths, fileProperties), bodyAt)
}

type Page = {
  readonly path: string
  readonly value: Value
}

type Leaving = {
  readonly path: string
  readonly now: Value | null
}

type Carried = {
  readonly path: string
  readonly after: string | null
}

function bodiesOver(repo: string, carried: ReadonlyMap<string, string | null>): Body {
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
  return reachingOf(
    [
      ...manifestsBeside(given, fileProperties),
      ...manifestsIn([...bodies.keys(), ...claimed], fileProperties),
    ],
    bodiesOver(repo, bodies)
  )
}

function landedElsewhere(was: Naming, now: Naming): readonly string[] {
  const said: string[] = []
  for (const [specifier, before] of was) {
    if (now.get(specifier) !== before) said.push(before)
  }
  return said
}

function importersAmong(given: string | Reading, landed: readonly string[]): ReadonlySet<string> {
  const said = new Set<string>()
  for (const one of landed) {
    for (const path of importersOf(given, one)) said.add(path)
  }
  return said
}

type Turning = {
  readonly path: string
  readonly before: string | null
  readonly was: Value | null
}

type Reread = {
  readonly path: string
  readonly before: string
  readonly after: string
}

type Rereading = {
  readonly was: Naming
  readonly reread: readonly Reread[]
}

export function rereadOver(
  given: string | Reading,
  turning: readonly Turning[],
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy,
  now: Naming,
  bodyAt: Body
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
  const reread: Reread[] = []
  for (const path of importersAmong(given, landedElsewhere(was, now))) {
    if (owned.has(path)) continue
    const body = bodyAt(path)
    if (body === null) continue
    reread.push({ path, before: body, after: body })
  }
  return { was, reread }
}
