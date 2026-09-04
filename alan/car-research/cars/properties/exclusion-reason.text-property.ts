import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExclusionReason = string

export const exclusionReason = {
  id: "01a06598-68c9-7b5f-95ff-40cc16b31ac4",
  pageTypeSlug: "text-property",
  slug: "exclusion-reason",
  propertySlug: "exclusion-reason",
  definition: "why this fell off the list of what Alan would buy",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
