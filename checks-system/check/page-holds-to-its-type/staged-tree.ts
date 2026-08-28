import { relative, resolve } from "node:path"
import type { FileTree } from "../../../page/file-tree.ts"
import { placeDirOf, repoPlacings, scanIn } from "../../../page/page-types.ts"
import { textAt } from "../../../page/text/text.ts"
import { AKASHA, rootFor, rootsHere } from "../../../repo/roots/roots.ts"
import type { Batch } from "../check-shape.ts"

const GONE = null

/**
 * The batch read as a tree, staged content standing over what is on disk.
 *
 * A BODY IS FETCHED WHEN IT IS ASKED FOR, NEVER HELD FOR EVERY PATH IN THE BATCH. This decoded
 * every path's body up front and kept the lot in a map. Over a patch that is a handful of files;
 * over a whole-tree audit `paths` is every tracked file, so the map became the whole repository as
 * strings — 2.9 GiB of them, built once here for each of the three checks that ask for a tree.
 * `page-holds-to-its-type` alone reached 8.3 GiB and the audit was reaped, because a live set that
 * size also stops the collector reclaiming the garbage the judging loop makes. Almost none of it
 * was ever read: that check opens twenty thousand paths out of eighty-nine thousand held, and
 * `relation-resolves` six hundred. Fetching on demand goes through `batch.tree.at`, which is the
 * same route and the same answer this map was filled from, so staged content still stands over
 * disk and a path the batch deletes still reads as gone.
 *
 * THE STANDING PATHS ARE KEPT AS AN ARRAY AND A SET BOTH. `paths` and `repoOf` walk them in order
 * and `open` asks after one, and rebuilding either shape per call is a scan of the whole tree in a
 * function called hundreds of times.
 */
export function treeOver(batch: Batch): FileTree | null {
  const roots = rootsHere()
  const root = rootFor(roots, AKASHA)
  if (root === undefined) return null
  const standing: string[] = []
  const going = new Set<string>()
  if (batch.root === root) {
    for (const path of batch.paths) {
      const at = relative(root, path)
      if (batch.tree.at(path) === GONE) going.add(at)
      else standing.push(at)
    }
  }
  const held = new Set(standing)
  const placed = repoPlacings(roots)
  return {
    root,
    pending: held,
    open: (relPath) => {
      if (going.has(relPath)) return GONE
      if (!held.has(relPath)) return textAt(root, relPath)
      const body = batch.tree.at(resolve(root, relPath))
      return body === GONE ? GONE : body.toString("utf8")
    },
    paths: (glob) => {
      const globs = typeof glob === "string" ? [glob] : glob
      const matched = globs.map((one) => new Bun.Glob(one))
      const added = standing.filter((at) => matched.some((one) => one.match(at)))
      const found = new Set([...scanIn(root, globs, AKASHA), ...added])
      return [...found].filter((at) => !going.has(at)).sort()
    },
    repoOf: (slug) => {
      const heldRepo = placed.get(slug)
      if (heldRepo !== undefined) return heldRepo
      const dir = `${placeDirOf(slug)}/`
      return standing.some((at) => at.startsWith(dir)) ? AKASHA : null
    },
  }
}
