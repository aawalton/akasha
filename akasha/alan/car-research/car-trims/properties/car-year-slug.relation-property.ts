import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CarYearSlug = Slug

export const carYearSlug = {
  id: "01a06827-645d-7785-a6e3-9c3c06e799fd",
  pageTypeSlug: "relation-property",
  slug: "car-year-slug",
  propertySlug: "car-year-slug",
  definition: "the model year this trim is sold in",
  targetPageTypeSlug: "page-type/car-year",
} as const satisfies RelationProperty
