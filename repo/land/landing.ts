import { existsSync, readFileSync } from "node:fs"
import { type Landing, landHere } from "../../page/index/build.ts"
import { pageNameOf } from "../../page/name/name.ts"
import type { Holds } from "../../page/index/relation/relation.ts"
import {
  builtFrom,
  indexReaches,
  keepBuiltFrom,
  markFrom,
  pageOidsIn,
} from "../../page/index/store/store.ts"
import { trackedIn } from "../../page/tracked/tracked.ts"
import { oidOfBody } from "../oid/oid.ts"

const PAGE_FILE = /\.[a-z0-9-]+\.md$/

export type Bodies = ReadonlyMap<string, string | null>

export function pageFile(relPath: string): boolean {
  return PAGE_FILE.test(relPath)
}

export function bodiesBefore(root: string, relPaths: readonly string[]): Bodies {
  const held = new Map<string, string | null>()
  for (const relPath of relPaths) {
    if (!pageFile(relPath)) continue
    const absolute = `${root}/${relPath}`
    if (!existsSync(absolute)) {
      held.set(relPath, null)
      continue
    }
    try {
      held.set(relPath, readFileSync(absolute, "utf8"))
    } catch {
      held.set(relPath, null)
    }
  }
  return held
}

function landingsFor(
  repo: string,
  root: string,
  before: Bodies,
  written: readonly string[],
  removed: readonly string[]
): readonly Landing[] {
  const found: Landing[] = []
  for (const relPath of [...written, ...removed]) {
    if (!pageFile(relPath)) continue
    const absolute = `${root}/${relPath}`
    const after = removed.includes(relPath)
      ? null
      : existsSync(absolute)
        ? readFileSync(absolute, "utf8")
        : null
    found.push({ source: { repo, key: relPath }, before: before.get(relPath) ?? null, after })
  }
  return found
}

function oidsBefore(
  before: Bodies,
  written: readonly string[],
  removed: readonly string[]
): ReadonlyMap<string, string | null> {
  const found = new Map<string, string | null>()
  for (const relPath of [...written, ...removed]) {
    if (!pageFile(relPath)) continue
    const body = before.get(relPath) ?? null
    found.set(relPath, body === null ? null : oidOfBody(Buffer.from(body, "utf8")))
  }
  return found
}

function markLanded(repo: string, root: string, was: ReadonlyMap<string, string | null>): void {
  const held = builtFrom()
  if (held === null) return
  const now = pageOidsIn(root)
  const before = new Map(now)
  for (const [key, oid] of was) {
    if (pageNameOf(key) === null) continue
    if (oid === null) before.delete(key)
    else before.set(key, oid)
  }
  if (markFrom(before) !== held[repo]) return
  keepBuiltFrom({ ...held, [repo]: markFrom(now) })
}

export function indexAfterLanding(
  repo: string,
  root: string,
  before: Bodies,
  written: readonly string[],
  removed: readonly string[]
): void {
  const landings = landingsFor(repo, root, before, written, removed)
  if (landings.length === 0) return
  if (!indexReaches(repo, root)) return
  const tracked = new Set(trackedIn(root))
  const holds: Holds = (asked, key) => asked === repo && tracked.has(key)
  try {
    landHere(landings, holds)
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    throw new Error(`the page index did not take ${String(landings.length)} page file(s): ${said}`)
  }
  markLanded(repo, root, oidsBefore(before, written, removed))
}
