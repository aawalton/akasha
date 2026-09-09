import type { TextProperty } from "@akasha/pages/text-property"

export type SourcePlaceId = string

export const sourcePlaceId = {
  id: "01a06583-acfb-77d7-9f0c-51e365ab8fef",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "source-place-id",
  propertySlug: "source-place-id",
  definition: "what the source calls the place",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
