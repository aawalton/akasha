import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ScaleSlug = Slug

export const scaleSlug = {
  id: "01a05446-e764-754e-a88e-2efffba18820",
  pageTypeSlug: "relation-property",
  slug: "scale-slug",
  propertySlug: "scale-slug",
  definition: "the scale a reading is read against",
  targetPageTypeSlug: "page-type/readout-scale",
} as const satisfies RelationProperty
