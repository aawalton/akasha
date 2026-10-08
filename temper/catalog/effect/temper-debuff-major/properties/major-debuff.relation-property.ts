import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const majorDebuff = {
  id: "01a0d8e8-f86c-7400-89c9-954aa9ed16bb",
  type: "page-type/relation-property",
  slug: "major-debuff",
  propertySlug: "major-debuff",
  definition: "a slug naming a harmful effect the game names Major",
  targetPageType: "page-type/temper-debuff-major",
  types: "ts",
  createdAt: "2026-09-25T14:12:21.740Z",
  updatedAt: "2026-09-25T14:12:34.000Z",
} as const satisfies RelationProperty
