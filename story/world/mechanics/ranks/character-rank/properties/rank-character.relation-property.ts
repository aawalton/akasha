import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const rankCharacter = {
  id: "01a10362-78a2-7ce2-844a-c8c5db7be7e4",
  type: "page-type/relation-property",
  slug: "rank-character",
  propertySlug: "character",
  definition: "the character a rank held is the rank of",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-10-03T20:09:07.490Z",
  updatedAt: "2026-10-03T20:09:11.000Z",
} as const satisfies RelationProperty
