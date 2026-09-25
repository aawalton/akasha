import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const majorDebuff = {
  id: "01a0d8e8-f86c-7400-89c9-954aa9ed16bb",
  type: "page-type/relation-property",
  slug: "major-debuff",
  propertySlug: "major-debuff",
  definition: "a slug naming a harmful effect the game names Major",
  targetPageType: "page-type/temper-debuff-major",
  types: "ts",
} as const satisfies RelationProperty
