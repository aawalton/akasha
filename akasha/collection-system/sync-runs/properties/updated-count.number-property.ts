import type { NumberProperty } from "@akasha/pages-system/number-property"

export type UpdatedCount = number

export const updatedCount = {
  id: "01a06861-f664-74ae-b1d1-834004ff407e",
  pageTypeSlug: "number-property",
  slug: "updated-count",
  propertySlug: "updated-count",
  definition: "how many pages a pull rewrote",
  max: null,
} as const satisfies NumberProperty
