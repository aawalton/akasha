import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CarModelSlug = Slug

export const carModelSlug = {
  id: "01a06599-35ba-78cb-b4b0-965d0110a110",
  pageTypeSlug: "relation-property",
  slug: "car-model-slug",
  propertySlug: "car-model-slug",
  definition: "the nameplate this is a year of",
  targetPageTypeSlug: "page-type/car-model",
} as const satisfies RelationProperty
