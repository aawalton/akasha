import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const parentStatement = {
  id: "01a0658a-739f-7ef0-8539-77171f82a139",
  type: "relation-property",
  slug: "parent-statement",
  propertySlug: "parent-statement",
  definition: "the statement this one sits under",
  targetPageType: "page-type/identity-statement",
  types: "ts",
} as const satisfies RelationProperty
