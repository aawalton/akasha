import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Index = Slug

export const index = {
  id: "01a04fe8-cebe-7dd9-9d9f-9c476d9fd293",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "index",
  propertySlug: "index",
  definition: "the index answering an edge kind",
  targetPageType: "page-type/index",
} as const satisfies RelationProperty
