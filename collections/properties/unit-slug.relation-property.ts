import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type UnitSlug = Slug

export const unitSlug = {
  id: "01a063de-2c60-7013-90a9-52d3c0a8908c",
  pageTypeSlug: "relation-property",
  slug: "unit-slug",
  propertySlug: "unit",
  definition: "what a collection's own lengths are counted in",
  targetPageType: "page-type/unit",
} as const satisfies RelationProperty
