import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const streamingService = {
  id: "01a18415-d471-7965-9252-6b5a944968cf",
  type: "page-type/text-property",
  slug: "streaming-service",
  propertySlug: "service",
  definition: "a service a collection's parts stream on",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-10-28T20:00:00.000Z",
  updatedAt: "2026-10-28T20:00:00.000Z",
} as const satisfies TextProperty
