import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type SortDescending = boolean

export const sortDescending = {
  id: "01a0680d-4d00-7006-b384-5c9e1f6a4107",
  pageTypeSlug: "boolean-property",
  slug: "sort-descending",
  propertySlug: "descending",
  definition: "whether a key orders from the largest down",
} as const satisfies BooleanProperty
