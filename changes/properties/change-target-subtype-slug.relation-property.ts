import type { Slug } from "../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../pages/relation-properties/relation-property.page-type.ts"

export type ChangeTargetSubtypeSlug = Slug

export const changeTargetSubtypeSlug = {
  id: "01a07c70-2c9f-7d84-a5fc-f10029577f81",
  pageTypeSlug: "relation-property",
  slug: "change-target-subtype-slug",
  propertySlug: "change-target-subtype-slug",
  definition: "the change target subtype a change acts on",
  targetPageTypeSlug: "page-type/change-target-subtype",
} as const satisfies RelationProperty
