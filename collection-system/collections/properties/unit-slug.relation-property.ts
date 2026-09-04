import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type UnitSlug = Slug

export const unitSlug = {
  id: "01a063de-2c60-7013-90a9-52d3c0a8908c",
  pageTypeSlug: "relation-property",
  slug: "unit-slug",
  propertySlug: "unit-slug",
  definition: "what a collection's own lengths are counted in",
  targetPageTypeSlug: "page-type/unit",
} as const satisfies RelationProperty
