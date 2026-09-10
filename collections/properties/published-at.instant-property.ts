import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type PublishedAt = string

export const publishedAt = {
  id: "01a063de-2c60-700e-9166-1483f2a283b0",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "published-at",
  propertySlug: "published-at",
  definition: "the moment a collection was released",
} as const satisfies InstantProperty
