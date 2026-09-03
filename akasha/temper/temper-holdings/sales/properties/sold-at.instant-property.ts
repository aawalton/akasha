import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type SoldAt = string

export const soldAt = {
  id: "01a0685d-89aa-7a8e-b4df-5eaab65932fb",
  pageTypeSlug: "instant-property",
  slug: "sold-at",
  propertySlug: "sold-at",
  definition: "when a sale went through",
} as const satisfies InstantProperty
