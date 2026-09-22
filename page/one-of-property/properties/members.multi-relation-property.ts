import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const members = {
  id: "01a062b2-e0c9-78a5-b56b-6dc7519eded7",
  type: "page-type/multi-relation-property",
  slug: "members",
  propertySlug: "members",
  definition: "a slug naming a property whose value a one-of property admits",
  targetPageType: "page-type/page-property",
  types: "ts",
} as const satisfies MultiRelationProperty
