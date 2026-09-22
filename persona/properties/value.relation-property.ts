import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const value = {
  id: "01a0534e-c7e0-74c3-9eea-499d48af54db",
  type: "page-type/relation-property",
  slug: "value",
  propertySlug: "value",
  definition: "the value a page is of",
  targetPageType: "page-type/value",
  types: "ts",
} as const satisfies RelationProperty
