import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const attunementElement = {
  id: "01a0ca70-a79c-7cb4-8645-cecb67c360ef",
  type: "page-type/relation-property",
  slug: "attunement-element",
  propertySlug: "element",
  definition: "the element an attunement is to",
  targetPageType: "page-type/element",
  types: "ts",
} as const satisfies RelationProperty
