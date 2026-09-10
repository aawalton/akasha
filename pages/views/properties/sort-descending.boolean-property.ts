import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const sortDescending = {
  id: "01a0680d-4d00-7006-b384-5c9e1f6a4107",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "sort-descending",
  propertySlug: "descending",
  definition: "whether a key orders from the largest down",
  types: "ts",
} as const satisfies BooleanProperty
