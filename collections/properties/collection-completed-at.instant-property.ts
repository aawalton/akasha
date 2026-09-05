import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type CollectionCompletedAt = string

export const collectionCompletedAt = {
  id: "01a063de-2c60-7008-b6ff-701e73349dd4",
  pageTypeSlug: "instant-property",
  slug: "collection-completed-at",
  propertySlug: "completed-at",
  definition: "when a collection was worked through to its end",
} as const satisfies InstantProperty
