import type { NumberProperty } from "@akasha/pages-system/number-property"

export type GroupPageSize = number

export const groupPageSize = {
  id: "01a0680d-4d00-700f-9e48-6b2d7f1a4110",
  pageTypeSlug: "number-property",
  slug: "group-page-size",
  propertySlug: "group-page-size",
  definition: "how many groups a view draws at once",
  max: null,
} as const satisfies NumberProperty
