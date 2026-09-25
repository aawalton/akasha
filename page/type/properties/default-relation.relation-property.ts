import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const defaultRelation = {
  id: "01a0d925-d415-78fe-84f4-f91fb9aba3ca",
  type: "page-type/relation-property",
  slug: "default-relation",
  propertySlug: "default-relation",
  definition: "the page a relation property defaults to",
  targetPageType: "page-type/page",
  types: "ts",
} as const satisfies RelationProperty
