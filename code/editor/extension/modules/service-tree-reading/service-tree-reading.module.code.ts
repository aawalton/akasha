export function countRows(nodes: readonly ServiceTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countOfKind(
  nodes: readonly ServiceTreeRow[],
  kind: ServiceTreeRow["kind"]
): number {
  let total = 0
  for (const node of nodes) {
    total += (node.kind === kind ? 1 : 0) + countOfKind(node.children, kind)
  }
  return total
}
