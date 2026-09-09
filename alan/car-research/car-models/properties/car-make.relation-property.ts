import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CarMake = Slug

export const carMake = {
  id: "01a0659a-4bc5-7b5d-a286-f3e3942ccd3b",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "car-make",
  propertySlug: "car-make",
  definition: "the make that builds this nameplate",
  targetPageType: "page-type/car-make",
} as const satisfies RelationProperty
