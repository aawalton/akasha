import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CarMakeSlug = Slug

export const carMakeSlug = {
  id: "01a0659a-4bc5-7b5d-a286-f3e3942ccd3b",
  pageTypeSlug: "relation-property",
  slug: "car-make-slug",
  propertySlug: "car-make-slug",
  definition: "the make that builds this nameplate",
  targetPageTypeSlug: "page-type/car-make",
} as const satisfies RelationProperty
