import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CollectionTypeSlug = Slug

export const collectionTypeSlug = {
  id: "01a06935-8628-7809-8c7e-6a0cb1b50efc",
  pageTypeSlug: "relation-property",
  slug: "collection-type-slug",
  propertySlug: "collection-type-slug",
  definition: "the kind of thing a collection gathers",
  targetPageTypeSlug: "page-type/collection-type",
} as const satisfies RelationProperty
