export function topologicalSort<TItem, TId extends string>(
  items: readonly TItem[],
  getId: (item: TItem) => TId,
  getDependencies: (item: TItem) => Set<TId>
): readonly TItem[] {
  const itemMap = new Map<TId, TItem>()
  for (const item of items) {
    itemMap.set(getId(item), item)
  }

  const inDegree = new Map<TId, number>()
  for (const item of items) {
    inDegree.set(getId(item), 0)
  }

  const reverseDeps = new Map<TId, Set<TId>>()
  for (const item of items) {
    reverseDeps.set(getId(item), new Set())
  }

  for (const item of items) {
    const itemId = getId(item)
    const deps = getDependencies(item)
    let count = 0

    for (const depId of deps) {
      if (itemMap.has(depId)) {
        count++
        const dependents = reverseDeps.get(depId)
        if (dependents) {
          dependents.add(itemId)
        }
      }
    }
    inDegree.set(itemId, count)
  }

  const queue: TItem[] = []
  for (const item of items) {
    if (inDegree.get(getId(item)) === 0) {
      queue.push(item)
    }
  }

  const result: TItem[] = []

  while (queue.length > 0) {
    const item = queue.shift()
    if (item === undefined) break
    result.push(item)

    const itemId = getId(item)
    const dependents = reverseDeps.get(itemId) ?? new Set()

    for (const dependentId of dependents) {
      const currentInDegree = inDegree.get(dependentId)
      if (currentInDegree === undefined || currentInDegree === 0) {
        continue
      }

      const newInDegree = currentInDegree - 1
      inDegree.set(dependentId, newInDegree)

      if (newInDegree === 0) {
        const dependentItem = itemMap.get(dependentId)
        if (dependentItem) {
          queue.push(dependentItem)
        }
      }
    }
  }

  if (result.length !== items.length) {
    throw new Error("Circular dependency detected. Cannot sort items with circular references.")
  }

  return result
}
