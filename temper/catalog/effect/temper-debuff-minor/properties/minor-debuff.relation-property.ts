import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const minorDebuff = {
  id: "01a0d8e8-f86d-7671-8d74-5c3951e6b4c8",
  type: "page-type/relation-property",
  slug: "minor-debuff",
  propertySlug: "minor-debuff",
  definition: "a slug naming a harmful effect the game names Minor",
  targetPageType: "page-type/temper-debuff-minor",
  types: "ts",
} as const satisfies RelationProperty
