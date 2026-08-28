import { relative, resolve } from "node:path"
import type { FileTree } from "../../../page/file-tree.ts"
import { placeDirOf, repoPlacings, scanIn } from "../../../page/page-types.ts"
import { textAt } from "../../../page/text/text.ts"
import { AKASHA, rootFor, rootsHere } from "../../../repo/roots/roots.ts"
import type { Batch } from "../check-shape.ts"

const GONE = null

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
    roots,
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
