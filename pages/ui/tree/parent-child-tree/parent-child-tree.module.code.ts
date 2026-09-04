export interface TreeNode<T> {
  item: T
  children: readonly TreeNode<T>[]
  depth: number
}

export interface BuildTreeOptions<T> {
  getParents?: (item: T) => readonly string[]
}

const MAX_DEPTH = 10

function defaultGetParents<T extends { data?: Readonly<Record<string, unknown>> }>(
  item: T
): readonly string[] {
  const parents = item.data?.parents
  if (!Array.isArray(parents)) return []
  return parents.filter((entry): entry is string => typeof entry === "string")
}

export function buildTree<T extends { id: string; data?: Readonly<Record<string, unknown>> }>(
  items: readonly T[],
  options?: BuildTreeOptions<T>
): readonly TreeNode<T>[] {
  const getParents = options?.getParents ?? defaultGetParents

  const itemMap = new Map<string, T>()
  for (const item of items) {
    itemMap.set(item.id, item)
  }

  const childrenMap = new Map<string, string[]>()
  const childIds = new Set<string>()

  for (const item of items) {
    const parents = getParents(item)
    for (const parentId of parents) {
      if (itemMap.has(parentId)) {
        childIds.add(item.id)
        const existing = childrenMap.get(parentId)
        if (existing) {
          existing.push(item.id)
        } else {
          childrenMap.set(parentId, [item.id])
        }
      }
    }
  }

  function buildNode(id: string, depth: number): TreeNode<T> | null {
    if (depth > MAX_DEPTH) return null
    const item = itemMap.get(id)
    if (!item) return null
    const childItemIds = childrenMap.get(id) ?? []
    const children: TreeNode<T>[] = []
    for (const childId of childItemIds) {
      const node = buildNode(childId, depth + 1)
      if (node) children.push(node)
    }
    return { item, children, depth }
  }

  const roots: TreeNode<T>[] = []
  for (const item of items) {
    if (!childIds.has(item.id)) {
      const node = buildNode(item.id, 0)
      if (node) roots.push(node)
    }
  }

  return roots
}
