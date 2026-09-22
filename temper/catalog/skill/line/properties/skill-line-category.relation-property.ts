import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillLineCategory = {
  id: "01a0cb10-f698-706a-a7c8-2193c2080c04",
  type: "page-type/relation-property",
  slug: "skill-line-category",
  propertySlug: "category",
  definition: "the group of lines a skill line is one of",
  targetPageType: "page-type/temper-skill-line-category",
  types: "ts",
} as const satisfies RelationProperty
