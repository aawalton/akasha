import type { Slug } from "../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../pages/relation-properties/relation-property.page-type.ts"

export type ChangeTargetType = Slug

export const changeTargetType = {
  id: "01a07c70-2049-7248-8790-afaa12ca852e",
  pageTypeSlug: "relation-property",
  slug: "change-target-type",
  propertySlug: "change-target-type",
  definition: "the change target type a page names",
  targetPageType: "page-type/change-target-type",
} as const satisfies RelationProperty
