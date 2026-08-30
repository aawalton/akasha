import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type AnsweredBy = Slug

export const answeredBy = {
  id: "01a053e6-3585-7b1a-86ec-d3f1f6b2169f",
  pageTypeSlug: "relation-property",
  slug: "answered-by",
  propertySlug: "answered-by",
  definition: "the persona a person hears from",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
