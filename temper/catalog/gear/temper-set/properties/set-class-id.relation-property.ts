import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const setClassId = {
  id: "01a05fd1-d43e-7ece-af53-4be28ed6067d",
  type: "page-type/relation-property",
  slug: "set-class-id",
  propertySlug: "class-id",
  definition: "the class a set is only offered to",
  targetPageType: "page-type/temper-class",
  types: "ts",
} as const satisfies RelationProperty
