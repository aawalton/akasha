import type {
  WorkColors,
  WorkNode,
  WorkTree,
} from "../work-tree-rows/work-tree-rows.module.code.ts"

// THE LIVELIEST FIRST. A row several seats state takes the liveliest of them, and a row takes the
// liveliest of everything standing under it, so a row says whether anything is moving on it. A
// color this does not rank sits behind every color it does.
const COLOR_RANK: readonly string[] = ["green", "blue", "yellow"]

function colorFor(node: WorkNode, colors: WorkColors): string | null {
  return colors.byInitiative[node.key] ?? null
}

function raised(one: string | null, other: string | null): string | null {
  if (one === null) {
    return other
  }
  if (other === null) {
    return one
  }
  const rankOf = (color: string): number => {
    const at = COLOR_RANK.indexOf(color)
    return at === -1 ? COLOR_RANK.length : at
  }
  return rankOf(one) <= rankOf(other) ? one : other
}

export function rollUp(nodes: readonly WorkNode[]): readonly WorkNode[] {
  return nodes.map((node) => {
    const children = rollUp(node.children)
    let color = node.color
    for (const child of children) {
      color = raised(color, child.color)
    }
    return { ...node, color, children }
  })
}

// NOTHING IS REDRAWN WHERE NO COLOR MOVED. A repaint arrives whenever any seat's sidecar is
// written, which is far more often than a turn state changes, so answering nothing where the tree
// would look the same is what keeps the panel off this host's thread.
export function recolor(tree: WorkTree, colors: WorkColors): WorkTree | undefined {
  let moved = false
  const walk = (nodes: readonly WorkNode[]): readonly WorkNode[] =>
    nodes.map((node) => {
      const children = walk(node.children)
      let color = colorFor(node, colors)
      for (const child of children) {
        color = raised(color, child.color)
      }
      if (color !== node.color) {
        moved = true
      }
      return { ...node, color, children }
    })
  const roots = walk(tree.roots)
  return moved ? { repo: tree.repo, roots } : undefined
}
