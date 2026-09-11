import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const arrivedAt = {
  id: "01a060fb-0410-74af-bb06-26d1ace07bf9",
  type: "instant-property",
  slug: "arrived-at",
  propertySlug: "arrived-at",
  definition: "when a reading reached us, which is not when it was taken",
  types: "ts",
} as const satisfies InstantProperty
