import type { DataFile } from "./create-data-file"

export function getSubcategory<K extends string, V, S extends string>(
  file: DataFile<K, V, S>,
  key: S
): { ids: readonly K[]; list: readonly V[]; data: Partial<Record<K, V>> } {
  const entry = file.subcategories[key]
  if (!entry) throw new Error(`getSubcategory: missing subcategory ${String(key)}`)
  return entry
}
