import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type FirstHeardAt = string

export const firstHeardAt = {
  id: "01a06240-340f-700d-b73e-b5c7abfb9162",
  pageTypeSlug: "instant-property",
  slug: "first-heard-at",
  propertySlug: "first-heard-at",
  definition: "when a track was heard for the first time",
} as const satisfies InstantProperty
