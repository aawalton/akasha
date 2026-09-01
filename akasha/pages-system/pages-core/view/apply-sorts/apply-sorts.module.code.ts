import { nullOrderSign } from "../../null-ordering/null-ordering.module.code.ts"
import type { ViewSort } from "../../schema/view-data/view-data.module.code.ts"
import type { FilterableRow } from "../apply-filters/apply-filters.module.code.ts"

export function applySorts<T extends FilterableRow>(
  items: readonly T[],
  sorts: readonly ViewSort[] | undefined,
  accessors: Record<string, (item: T) => string | number | null>
): readonly T[] {
  if (!sorts || sorts.length === 0) return items.slice()

  const result = items.slice()
  result.sort((a, b) => {
    for (const { field, direction } of sorts) {
      const accessor = accessors[field]
      if (!accessor) continue
      const aVal = accessor(a)
      const bVal = accessor(b)
      if (aVal === null && bVal === null) continue
      if (aVal === null || bVal === null) return nullOrderSign(aVal === null, direction === "desc")
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      if (cmp !== 0) {
        const normalized = direction === "desc" ? "desc" : "asc"
        return normalized === "asc" ? cmp : -cmp
      }
    }
    return 0
  })
  return result
}
