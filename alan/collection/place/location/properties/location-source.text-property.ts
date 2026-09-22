import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const locationSource = {
  id: "01a06583-acfb-7733-9a33-3707ae3ee5fa",
  type: "page-type/text-property",
  slug: "location-source",
  propertySlug: "location-source",
  definition: "the place's source",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
