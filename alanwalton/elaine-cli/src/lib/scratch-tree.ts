import { mkdtempSync, rmSync } from "node:fs"

const trees: string[] = []

export function scratchTree(prefix: string): string {
  const tree = mkdtempSync(`/var/tmp/${prefix}`)
  trees.push(tree)
  return tree
}

export function releaseScratchTrees(): undefined {
  for (const tree of trees.splice(0)) rmSync(tree, { recursive: true, force: true })
  return undefined
}
