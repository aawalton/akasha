import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import type { Naming } from "@akasha/code-system/code-specifier"
import { reachesIn, reachingOver } from "@akasha/code-system/package-manifest"
import { filePropertiesAt } from "../index-entries/index-entries.module.code.ts"
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
