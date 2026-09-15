import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const pageSize = {
  id: "01a0680d-4d00-700d-8b73-7d5c2a9e410e",
  type: "page-type/number-property",
  slug: "page-size",
  propertySlug: "page-size",
  definition: "how many pages a view draws at once",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
