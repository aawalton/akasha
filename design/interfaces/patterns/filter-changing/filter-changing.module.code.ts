import type { SortDirection } from "akasha/design/interfaces/patterns/sort-types/sort-types.module.code.ts"

export type SearchUpdate = (values: { search: string }) => void

export type SortUpdate<Field> = (values: { sortBy: Field; sortDirection: SortDirection }) => void

export function searchChanging(update: SearchUpdate): (value: string) => void {
  return (value) => update({ search: value })
}

export function sortChanging<Field>(
  update: SortUpdate<Field>
): (field: Field, direction: SortDirection) => void {
  return (field, direction) => update({ sortBy: field, sortDirection: direction })
}
