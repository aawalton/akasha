import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type ScaleSlug = Slug

export const scaleSlug = {
  id: "01a05446-e764-754e-a88e-2efffba18820",
  pageTypeSlug: "relation-property",
  slug: "scale-slug",
  propertySlug: "scale-slug",
  definition: "the scale a reading is read against",
  targetPageTypeSlug: "page-type/readout-scale",
} as const satisfies RelationProperty
