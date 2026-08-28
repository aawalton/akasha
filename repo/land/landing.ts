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

/**
 * The index brought up to what this landing left on disk, or a refusal.
 *
 * A FAILURE HERE REFUSES RATHER THAN PRINTING. A printed line stands in the middle of a report
 * whose last line says the commit succeeded, so the landing reads as done while the index has
 * stopped describing the tree. Nothing downstream tells that apart from a repository with no
 * page in it. Throwing hands the caller the failure while it still knows which commit it
 * belongs to.
 */
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
  // THE MARK IS WRITTEN OUTSIDE THE INDEX LOCK, WEIGHED RATHER THAN MISSED. `markLanded` reads
  // `built-from.json` and writes it back, so two landings for different repositories can drop
  // one repository's mark, and `scan.ts` then refuses with `the page index was not built over
  // X`. It stays out because the mark costs a git walk of the whole repository — around 170ms
  // against the 190ms a landing holds the lock for — so folding it in would roughly double
  // every landing's hold, to protect against a failure that is loud, names itself, and is
  // cleared by `ops index refresh`. The rebuild's own marks are inside the lock, where they
  // cost nothing extra because the walk they need is already held.
  markLanded(repo, root)
}
