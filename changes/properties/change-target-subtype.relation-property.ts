import type { Slug } from "../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../pages/relation-properties/relation-property.page-type.ts"

export type ChangeTargetSubtype = Slug

export const changeTargetSubtype = {
  id: "01a07c70-2c9f-7d84-a5fc-f10029577f81",
  pageTypeSlug: "relation-property",
  slug: "change-target-subtype",
  propertySlug: "change-target-subtype",
  definition: "the change target subtype a change acts on",
  targetPageTypeSlug: "page-type/change-target-subtype",
} as const satisfies RelationProperty
