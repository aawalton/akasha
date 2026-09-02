import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DisplayOrder = number

export const displayOrder = {
  id: "01a05fac-7584-76ae-9152-c162b96618d1",
  pageTypeSlug: "number-property",
  slug: "display-order",
  propertySlug: "display-order",
  definition: "where a thing falls among its siblings when the siblings are shown",
  max: null,
} as const satisfies NumberProperty
