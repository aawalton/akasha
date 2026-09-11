import { entriesAt } from "akasha/pages/entries/page-entries.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export function readBack(
  root: string,
  page: string,
  propertySlug: string,
  held: string
): readonly Value[] {
  const read = entriesAt(root, page, propertySlug, held)
  if ("refused" in read) throw new Error(read.refused)
  return read.entries
}
