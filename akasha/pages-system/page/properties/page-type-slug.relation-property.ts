import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"
import type { Slug } from "./slug.text-property.ts"

export type PageTypeSlug = Slug

export const pageTypeSlug = {
  id: "01a04a10-319c-7000-a5f4-e048da231b65",
  pageTypeSlug: "relation-property",
  slug: "page-type-slug",
  propertySlug: "page-type-slug",
  definition: "the page type a page is",
  targetPageTypeSlug: "page-type/page-type",
} as const satisfies RelationProperty
