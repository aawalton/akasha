import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const changeTargetSubtypeParent = {
  id: "01a07c70-3907-751a-a23e-6e2b0bb761be",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "change-target-subtype-parent",
  propertySlug: "parent",
  definition: "the change target subtype another change target subtype narrows",
  targetPageType: "page-type/change-target-subtype",
  types: "ts",
} as const satisfies RelationProperty
