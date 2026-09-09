import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type UnitWindow = Slug

export const unitWindow = {
  id: "01a0879e-e807-7ef6-8783-ae8c89413845",
  pageTypeSlug: "relation-property",
  slug: "unit-window",
  propertySlug: "unit",
  definition: "what a collection's own lengths are counted in",
  targetPageType: "page-type/unit",
} as const satisfies RelationProperty
