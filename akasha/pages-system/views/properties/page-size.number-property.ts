import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PageSize = number

export const pageSize = {
  id: "01a0680d-4d00-700d-8b73-7d5c2a9e410e",
  pageTypeSlug: "number-property",
  slug: "page-size",
  propertySlug: "page-size",
  definition: "how many pages a view draws at once",
  max: null,
} as const satisfies NumberProperty
