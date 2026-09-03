import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CarModelSlug = Slug

export const carModelSlug = {
  id: "01a0659d-2433-765e-8388-018c1589b5bb",
  pageTypeSlug: "relation-property",
  slug: "car-model-slug",
  propertySlug: "car-model-slug",
  definition: "the nameplate this is a year of",
  targetPageTypeSlug: "page-type/car-model",
} as const satisfies RelationProperty
