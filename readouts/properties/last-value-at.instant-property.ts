import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type LastValueAt = string

export const lastValueAt = {
  id: "01a05446-e76a-777a-a2d1-2a00dc9afebe",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "last-value-at",
  propertySlug: "last-value-at",
  definition: "when the reading last taken was taken",
} as const satisfies InstantProperty
