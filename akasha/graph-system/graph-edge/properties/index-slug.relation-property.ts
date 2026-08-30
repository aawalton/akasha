import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type IndexSlug = Slug

export const indexSlug = {
  id: "01a04fe8-cebe-7dd9-9d9f-9c476d9fd293",
  pageTypeSlug: "relation-property",
  slug: "index-slug",
  propertySlug: "index-slug",
  definition: "the index answering an edge kind",
  targetPageTypeSlug: "page-type/index",
} as const satisfies RelationProperty
