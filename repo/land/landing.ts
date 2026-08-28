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

/**
 * The oid each page file this landing carried held before it landed, and null for one that was not
 * there at all.
 *
 * WHAT THE MARK IS RECONSTRUCTED FROM. `markLanded` puts these back into a walk of the tree to get
 * the tree as it stood before this landing, which is the only way it can tell its own pages from
 * one that moved on disk and was never landed.
 */
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

/**
 * One repository's rows marked as standing for the tree there now, where this landing is all that
 * has moved since the mark before it.
 *
 * A LANDING UPDATES THE RECORD OF WHAT THE INDEX WAS BUILT OVER, AND NEVER CREATES IT. `builtFrom`
 * answering null says the index was never written, or was taken away; a landing carries a handful
 * of pages and has walked no repository, so a record written here claims coverage no build ever
 * gave — and claims it for the landing's own repository alone. Scans there then read an index
 * holding no page and answer nothing, which reads exactly like a repository with no page in it and
 * passes every check over it, while every other repository is refused for a record that never
 * named it. Left null, the refusal stands over every repository until the index is written again.
 *
 * AND NEVER WIDENS IT PAST THE PAGES IT INDEXED. The mark is taken over every page in the
 * repository while the landing has updated rows for only the pages it carried, so a page changed
 * on disk and never landed was folded into it, and `indexFreshFor` then answered true over that
 * page's stale row — the strong guard reporting current over rows that are not, and the two readers
 * that fall back to a live scan on it never falling back. `was` carries the oid each landed page
 * held before this landing, so putting those back into the walk gives the tree as it stood; that
 * matching the recorded mark is what says this landing is all that moved. Anything else leaves the
 * old mark where it is, and the guard goes on refusing until a rebuild walks the whole tree.
 *
 * THE COMPARE CAN ONLY WITHHOLD A MARK, NEVER INVENT ONE. A `was` that is short, or an oid worked
 * out differently from the way the walk works one out, makes the reconstruction miss and the mark
 * stay as it was. Neither can turn a tree that has drifted into a mark saying it has not.
 */
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
  markLanded(repo, root, oidsBefore(before, written, removed))
}
