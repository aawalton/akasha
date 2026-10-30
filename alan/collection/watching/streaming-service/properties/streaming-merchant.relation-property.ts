import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const streamingMerchant = {
  id: "01a18432-af59-7388-a6eb-4c8e5da6e2bd",
  type: "page-type/relation-property",
  slug: "streaming-merchant",
  propertySlug: "merchant",
  definition: "the Monarch merchant a streaming service is charged under",
  targetPageType: "page-type/monarch-merchant",
  types: "ts",
  createdAt: "2026-10-28T20:27:56.630Z",
  updatedAt: "2026-10-30T15:28:09.570Z",
} as const satisfies RelationProperty
