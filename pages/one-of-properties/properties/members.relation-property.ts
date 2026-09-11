import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const members = {
  id: "01a062b2-e0c9-78a5-b56b-6dc7519eded7",
  type: "relation-property",
  slug: "members",
  propertySlug: "members",
  definition: "a slug naming a property a one-of property admits a value of",
  targetPageType: "page-type/page-property",
  types: "ts",
} as const satisfies RelationProperty
