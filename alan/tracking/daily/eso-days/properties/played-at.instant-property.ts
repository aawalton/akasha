import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type PlayedAt = string

export const playedAt = {
  id: "01a06240-340f-7003-a499-38bacdc77226",
  pageTypeSlug: "instant-property",
  slug: "played-at",
  propertySlug: "played-at",
  definition: "when a play happened",
} as const satisfies InstantProperty
