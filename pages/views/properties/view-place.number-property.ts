import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ViewPlace = number

export const viewPlace = {
  id: "01a0680d-4d00-7015-b643-6e2c9a8f4116",
  pageTypeSlug: "number-property",
  slug: "view-place",
  propertySlug: "view-place",
  definition: "where a view sits among the views under one nav item",
  max: null,
} as const satisfies NumberProperty
