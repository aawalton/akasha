import type { Slug } from "../../page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type TargetPageTypeSlug = Slug

export const targetPageTypeSlug = {
  id: "01a04a08-fcf3-7001-9f43-3bfdc57c3676",
  pageTypeSlug: "relation-property",
  slug: "target-page-type-slug",
  propertySlug: "target-page-type-slug",
  definition: "the page type this relation's value names, or a page type extending it",
  targetPageTypeSlug: "page-type/page-type",
} as const satisfies RelationProperty
