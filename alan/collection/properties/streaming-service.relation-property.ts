import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const streamingService = {
  id: "01a18415-d471-7965-9252-6b5a944968cf",
  type: "page-type/relation-property",
  slug: "streaming-service",
  propertySlug: "service",
  definition: "a service a collection's parts stream on",
  targetPageType: "page-type/streaming-service",
  types: "ts",
  createdAt: "2026-10-28T20:00:00.000Z",
  updatedAt: "2026-10-28T20:41:21.414Z",
} as const satisfies RelationProperty
