import { existsSync, readFileSync } from "node:fs"
import { type Landing, landHere, markLanded } from "../../page/index/build.ts"
import type { Holds } from "../../page/index/relation/relation.ts"
import { indexReaches } from "../../page/index/store/store.ts"
import { trackedIn } from "../../page/tracked/tracked.ts"

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

export function indexAfterLanding(
  repo: string,
  root: string,
  before: Bodies,
  written: readonly string[],
  removed: readonly string[]
): readonly string[] {
  const landings = landingsFor(repo, root, before, written, removed)
  if (landings.length === 0) return []
  if (!indexReaches(repo, root)) return []
  const tracked = new Set(trackedIn(root))
  const holds: Holds = (asked, key) => asked === repo && tracked.has(key)
  try {
    landHere(landings, holds)
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    return [`        THE PAGE INDEX DID NOT TAKE ${String(landings.length)} PAGE FILE(S): ${said}`]
  }
  markLanded(repo, root)
  return []
}
