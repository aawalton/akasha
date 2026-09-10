import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type CarModel = Slug

export const carModel = {
  id: "01a0659d-2433-765e-8388-018c1589b5bb",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "car-model",
  propertySlug: "car-model",
  definition: "the nameplate this is a year of",
  targetPageType: "page-type/car-model",
} as const satisfies RelationProperty
