import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const parentStatement = {
  id: "01a0658a-739f-7ef0-8539-77171f82a139",
  type: "page-type/relation-property",
  slug: "parent-statement",
  propertySlug: "parent-statement",
  definition: "this statement's parent statement",
  targetPageType: "page-type/identity-statement",
  types: "ts",
} as const satisfies RelationProperty
