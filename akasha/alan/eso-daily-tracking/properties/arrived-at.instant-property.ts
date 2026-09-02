import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type ArrivedAt = string

export const arrivedAt = {
  id: "01a060fb-0410-74af-bb06-26d1ace07bf9",
  pageTypeSlug: "instant-property",
  slug: "arrived-at",
  propertySlug: "arrived-at",
  definition: "when a reading reached us, which is not when it was taken",
} as const satisfies InstantProperty
