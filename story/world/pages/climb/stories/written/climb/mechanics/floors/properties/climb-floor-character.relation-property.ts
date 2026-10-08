import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const climbFloorCharacter = {
  id: "01a0f953-d88d-7204-8c33-e97c2c9a552b",
  type: "page-type/relation-property",
  slug: "climb-floor-character",
  propertySlug: "character",
  definition: "the character a floor of The Climb sets its task for",
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-10-01T21:16:56.845Z",
  updatedAt: "2026-10-01T21:17:02.000Z",
} as const satisfies RelationProperty
