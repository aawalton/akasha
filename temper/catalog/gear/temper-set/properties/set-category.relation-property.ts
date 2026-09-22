import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const setCategory = {
  id: "01a0cb11-8d37-714d-b19f-47ba19eec706",
  type: "page-type/relation-property",
  slug: "set-category",
  propertySlug: "category",
  definition: "the group of sets a set is one of",
  targetPageType: "page-type/temper-set-category",
  types: "ts",
} as const satisfies RelationProperty
