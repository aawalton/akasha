import type { TextProperty } from "@akasha/pages/text-property"

export type LocationSource = string

export const locationSource = {
  id: "01a06583-acfb-7733-9a33-3707ae3ee5fa",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "location-source",
  propertySlug: "location-source",
  definition: "where the place came from",
  maxLength: 50,
  nameFormat: null,
} as const satisfies TextProperty
