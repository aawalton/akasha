import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const phraseKind = {
  id: "01a0c57a-d186-743b-b2d3-7d4f06b81c0c",
  type: "page-type/relation-property",
  slug: "phrase-kind",
  propertySlug: "phrase-kind",
  definition: "the sort of phrase a construction writes",
  targetPageType: "page-type/phrase-kind",
  types: "ts",
} as const satisfies RelationProperty
