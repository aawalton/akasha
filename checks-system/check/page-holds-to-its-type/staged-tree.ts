import { relative } from "node:path"
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
  const staged = new Map<string, string | null>()
  if (batch.root === root) {
    for (const path of batch.paths) {
      const body = batch.tree.at(path)
      staged.set(relative(root, path), body === GONE ? GONE : body.toString("utf8"))
    }
  }
  const standing = [...staged.keys()].filter((at) => staged.get(at) !== GONE)
  const going = new Set([...staged.keys()].filter((at) => staged.get(at) === GONE))
  const placed = repoPlacings(roots)
  return {
    root,
    pending: new Set(standing),
    open: (relPath) => (staged.has(relPath) ? staged.get(relPath) ?? GONE : textAt(root, relPath)),
    paths: (glob) => {
      const globs = typeof glob === "string" ? [glob] : glob
      const matched = globs.map((one) => new Bun.Glob(one))
      const added = standing.filter((at) => matched.some((one) => one.match(at)))
      const found = new Set([...scanIn(root, globs, AKASHA), ...added])
      return [...found].filter((at) => !going.has(at)).sort()
    },
    repoOf: (slug) => {
      const held = placed.get(slug)
      if (held !== undefined) return held
      const dir = `${placeDirOf(slug)}/`
      return standing.some((at) => at.startsWith(dir)) ? AKASHA : null
    },
  }
}
