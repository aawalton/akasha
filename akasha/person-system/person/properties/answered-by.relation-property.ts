import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type AnsweredBy = Slug

export const answeredBy = {
  id: "01a053e6-3585-7b1a-86ec-d3f1f6b2169f",
  pageTypeSlug: "relation-property",
  slug: "answered-by",
  propertySlug: "answered-by",
  definition: "the persona a person hears from",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
