import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const changeTargetSubtypeParent = {
  id: "01a07c70-3907-751a-a23e-6e2b0bb761be",
  type: "page-type/relation-property",
  slug: "change-target-subtype-parent",
  propertySlug: "parent",
  definition: "the change target subtype another change target subtype narrows",
  targetPageType: "page-type/change-target-subtype",
  types: "ts",
  createdAt: "2026-09-07T15:15:24.551Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
