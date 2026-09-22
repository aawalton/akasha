import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillLineClass = {
  id: "01a05fca-cb87-7a9a-9dda-95916e9f73d7",
  type: "page-type/relation-property",
  slug: "skill-line-class",
  propertySlug: "class",
  definition: "the class a skill line belongs to",
  targetPageType: "page-type/temper-class",
  types: "ts",
} as const satisfies RelationProperty
