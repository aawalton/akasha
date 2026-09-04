import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type ReviewedAt = string

export const reviewedAt = {
  id: "01a0685f-3f4b-7b20-9349-0d532a204a4f",
  pageTypeSlug: "instant-property",
  slug: "reviewed-at",
  propertySlug: "reviewed-at",
  definition: "when a review was stepped through",
} as const satisfies InstantProperty
