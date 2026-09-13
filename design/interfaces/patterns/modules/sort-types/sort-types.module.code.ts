export type SortDirection = "asc" | "desc"

export interface SortOption<T extends string = string> {
  value: T
  label: string
  defaultDirection?: SortDirection
}

export interface SortEntry<T extends string = string> {
  field: T
  direction: SortDirection
}
