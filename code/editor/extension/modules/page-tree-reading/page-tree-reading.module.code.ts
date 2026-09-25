import type { PageTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/page-tree/page-tree.code-editor-data-interface.code.ts"

export function countRows(nodes: readonly PageTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countPages(nodes: readonly PageTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += (node.at === null ? 0 : 1) + countPages(node.children)
  }
  return total
}
