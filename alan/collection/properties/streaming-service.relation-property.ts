import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const streamingService = {
  id: "01a18415-d471-7965-9252-6b5a944968cf",
  type: "page-type/relation-property",
  slug: "streaming-service",
  propertySlug: "service",
  definition: "a streaming service that has a part of a collection",
  targetPageType: "page-type/streaming-service",
  types: "ts",
  createdAt: "2026-10-28T20:00:00.000Z",
  updatedAt: "2026-10-30T15:03:38.675Z",
} as const satisfies RelationProperty
