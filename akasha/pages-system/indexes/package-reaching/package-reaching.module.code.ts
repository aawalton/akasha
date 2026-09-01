import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import type { Naming } from "@akasha/code-system/code-specifier"
import { reachesIn, reachingOver } from "@akasha/code-system/package-manifest"
import type { Value } from "@akasha/pages-system/page-value"
import { filePropertiesAt, pathsOf, under } from "../index-entries/index-entries.module.code.ts"
import { everyPath } from "../index-reading/index-reading.module.code.ts"
import type { Reading } from "../index-shape/index-shape.module.code.ts"

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

export function reachingIn(
  paths: Iterable<string>,
  fileProperties: ReadonlyMap<string, string | null>,
  bodyAt: Body
): Naming {
  return reachingOf(manifestsAmong(paths, fileProperties.get(MANIFEST) ?? null), bodyAt)
}

export function reachingAt(given: string | Reading, bodyAt: Body): Naming {
  return reachingIn(everyPath(given), filePropertiesAt(given), bodyAt)
}

export function reachingFor(root: string): Naming {
  const found = HELD.get(root)
  if (found !== undefined) return found
  const said = reachingAt(root, bodiesAt(root))
  HELD.set(root, said)
  return said
}

export type Standing = {
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
  held: readonly Standing[],
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>
): Naming {
  const claimed = held.flatMap((one) => pathsOf(one.value, one.path, repo, fileProperties))
  return reachingIn(claimed, fileProperties, bodiesAt(repo))
}

export function reachingSettled(
  given: string | Reading,
  held: readonly Leaving[],
  carried: readonly Carried[],
  repo: string,
  fileProperties: ReadonlyMap<string, string | null>
): Naming {
  const bodies = new Map(carried.map((one) => [under(repo, one.path), one.after]))
  const claimed = held.flatMap((one) =>
    one.now === null ? [under(repo, one.path)] : pathsOf(one.now, one.path, repo, fileProperties)
  )
  return reachingIn(
    [...everyPath(given), ...bodies.keys(), ...claimed],
    fileProperties,
    bodiesOver(repo, bodies)
  )
}
