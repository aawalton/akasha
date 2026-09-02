export interface GroupSortEntry {
  field: string
  direction: "asc" | "desc"
}

export interface GroupDefinition<T> {
  getKey: (item: T) => string
  getKeys?: (item: T) => readonly string[]
  getLabel: (key: string) => string
  getSortValue?: (key: string, field: string) => string | number
}

export interface Group<T> {
  key: string
  label: string
  items: readonly T[]
}

export function groupItems<T>(
  items: readonly T[],
  definition: GroupDefinition<T>,
  sorts: readonly GroupSortEntry[]
): readonly Group<T>[] {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const keys = definition.getKeys?.(item) ?? [definition.getKey(item)]
    for (const key of keys) {
      const arr = map.get(key)
      if (arr) {
        arr.push(item)
      } else {
        map.set(key, [item])
      }
    }
  }

  const entries = [...map.entries()].sort(([a], [b]) => {
    for (const { field, direction } of sorts) {
      if (definition.getSortValue) {
        const valA = definition.getSortValue(a, field)
        const valB = definition.getSortValue(b, field)
        let cmp: number
        if (typeof valA === "number" && typeof valB === "number") {
          cmp = valA - valB
        } else {
          cmp = String(valA).localeCompare(String(valB))
        }
        if (cmp !== 0) return direction === "desc" ? -cmp : cmp
      } else {
        const cmp = a.localeCompare(b)
        if (cmp !== 0) return direction === "desc" ? -cmp : cmp
      }
    }
    return 0
  })

  return entries.map(([key, items]) => ({
    key,
    label: definition.getLabel(key),
    items,
  }))
}
