import type { RelationProperty } from "../relation-properties/relation-property.page-type.types.ts"
import type { Slug } from "./slug.text-property.ts"

export type PagePageType = Slug

export const pagePageType = {
  id: "01a08788-f002-7f3a-98b4-1f2f970f0454",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "page-page-type",
  propertySlug: "type",
  definition: "the page type a page is",
  targetPageType: "page-type/page-type",
} as const satisfies RelationProperty
