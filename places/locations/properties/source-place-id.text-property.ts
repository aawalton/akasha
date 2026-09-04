import type { TextProperty } from "@akasha/pages-system/text-property"

export type SourcePlaceId = string

export const sourcePlaceId = {
  id: "01a06583-acfb-77d7-9f0c-51e365ab8fef",
  pageTypeSlug: "text-property",
  slug: "source-place-id",
  propertySlug: "source-place-id",
  definition: "what the source calls the place",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
