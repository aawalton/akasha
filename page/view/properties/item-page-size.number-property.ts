import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const itemPageSize = {
  id: "01a0680d-4d00-700e-b921-4a6f8d3c410f",
  type: "page-type/number-property",
  slug: "item-page-size",
  propertySlug: "item-page-size",
  definition: "how many pages a view draws at once inside a group",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
