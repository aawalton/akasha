export function countRows(nodes: readonly WorkTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countOfKind(nodes: readonly WorkTreeRow[], kind: WorkTreeRow["kind"]): number {
  let total = 0
  for (const node of nodes) {
    total += (node.kind === kind ? 1 : 0) + countOfKind(node.children, kind)
  }
  return total
}

export function workKeys(nodes: readonly WorkTreeRow[]): readonly string[] {
  return nodes.flatMap((node) => [node.key, ...workKeys(node.children)])
}
