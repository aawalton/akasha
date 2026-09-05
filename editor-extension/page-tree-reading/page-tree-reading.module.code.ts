import type { PageNode } from "../page-tree-assemble/page-tree-assemble.module.code.ts"

export function countRows(nodes: readonly PageNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countPages(nodes: readonly PageNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += (node.at === null ? 0 : 1) + countPages(node.children)
  }
  return total
}

// A ROW REPRESENTING NO PAGE OPENS NOTHING. Every other row names its document by a whole path,
// the service knowing the checkout, so there is nothing to join here.
export function documentPath(node: PageNode): string | undefined {
  return node.at ?? undefined
}
