import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ItemPageSize = number

export const itemPageSize = {
  id: "01a0680d-4d00-700e-b921-4a6f8d3c410f",
  pageTypeSlug: "number-property",
  slug: "item-page-size",
  propertySlug: "item-page-size",
  definition: "how many pages a view draws at once inside one group",
  max: null,
} as const satisfies NumberProperty
