export type TreeNode<Held> = {
  readonly parsed: Held
  readonly children: readonly TreeNode<Held>[]
}

type Ordered = {
  readonly id: string
  readonly sortOrder: number
}

export function nodeUnder<Held extends Ordered>(
  childrenByParentId: ReadonlyMap<string | null, readonly Held[]>,
  parent: Held
): TreeNode<Held> {
  const childRows = childrenByParentId.get(parent.id) ?? []
  const sortedChildren = [...childRows].sort((a, b) => a.sortOrder - b.sortOrder)
  return {
    parsed: parent,
    children: sortedChildren.map((one) => nodeUnder(childrenByParentId, one)),
  }
}
