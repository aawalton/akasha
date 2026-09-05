import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type IndexSlug = Slug

export const indexSlug = {
  id: "01a04fe8-cebe-7dd9-9d9f-9c476d9fd293",
  pageTypeSlug: "relation-property",
  slug: "index-slug",
  propertySlug: "index-slug",
  definition: "the index answering an edge kind",
  targetPageTypeSlug: "page-type/index",
} as const satisfies RelationProperty
