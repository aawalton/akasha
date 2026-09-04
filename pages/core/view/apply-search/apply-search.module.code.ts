import type { FilterableRow } from "../apply-filters/apply-filters.module.code.ts"

export function applySearch<T extends FilterableRow>(
  items: readonly T[],
  search: string,
  searchField: string
): readonly T[] {
  if (search === "") return items.slice()
  const lower = search.toLowerCase()
  return items.filter((row) => {
    const val = String(row[searchField] ?? "")
    return val.toLowerCase().includes(lower)
  })
}
