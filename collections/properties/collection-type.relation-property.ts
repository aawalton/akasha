import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CollectionType = Slug

export const collectionType = {
  id: "01a06935-8628-7809-8c7e-6a0cb1b50efc",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "collection-type",
  propertySlug: "collection-type",
  definition: "the kind of thing a collection gathers",
  targetPageType: "page-type/collection-type",
} as const satisfies RelationProperty
