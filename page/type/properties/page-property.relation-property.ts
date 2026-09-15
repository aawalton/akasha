import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const pageProperty = {
  id: "01a04df3-6847-78ba-a32d-216da05c58ee",
  type: "page-type/relation-property",
  slug: "page-property",
  propertySlug: "page-property",
  definition: "a slug naming a page property",
  targetPageType: "page-type/page-property",
  types: "ts",
} as const satisfies RelationProperty
