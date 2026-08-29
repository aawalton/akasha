import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/page-property/relation-property.page-type.ts"

export type PageSlug = Slug

export const pageSlug = {
  id: "01a04a08-fcf3-7004-af8a-1200dcbd314b",
  pageTypeSlug: "relation-property",
  slug: "page-slug",
  definition: "a slug naming a page",
  targetPageTypeSlug: "page-type/page",
} as const satisfies RelationProperty
