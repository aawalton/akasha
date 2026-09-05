import * as path from "node:path"
import type { WorkNode, WorkTree } from "../work-tree-rows/work-tree-rows.module.code.ts"

export function countRows(nodes: readonly WorkNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function workKeys(nodes: readonly WorkNode[]): readonly string[] {
  return nodes.flatMap((node) => [node.key, ...workKeys(node.children)])
}

// A ROW REPRESENTING NOTHING DECLARED OPENS NOTHING. Every other row names its document by a path
// under the checkout the tree carries, so the two are joined here rather than at each caller.
export function documentPath(tree: WorkTree, node: WorkNode): string | undefined {
  return node.relPath === null ? undefined : path.join(tree.repo, node.relPath)
}
