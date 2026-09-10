import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../relation-property.page-type.types.ts"

export type TargetPageType = Slug

export const targetPageType = {
  id: "01a04a08-fcf3-7001-9f43-3bfdc57c3676",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "target-page-type",
  propertySlug: "target-page-type",
  definition: "the page type this relation's value names, or a page type extending it",
  targetPageType: "page-type/page-type",
} as const satisfies RelationProperty
