import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CarYear = Slug

export const carYear = {
  id: "01a06827-645d-7785-a6e3-9c3c06e799fd",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "car-year",
  propertySlug: "car-year",
  definition: "the model year this trim is sold in",
  targetPageType: "page-type/car-year",
} as const satisfies RelationProperty
