import type { Slug } from "../../../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../../pages/relation-properties/relation-property.page-type.ts"

export type ChangeTargetSubtypeParent = Slug

export const changeTargetSubtypeParent = {
  id: "01a07c70-3907-751a-a23e-6e2b0bb761be",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "change-target-subtype-parent",
  propertySlug: "parent",
  definition: "the change target subtype another change target subtype narrows",
  targetPageType: "page-type/change-target-subtype",
} as const satisfies RelationProperty
