import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type TagSlugs = List<Slug>

export const tagSlugs = {
  id: "01a0680b-2b00-700c-8d95-4f6a1b3c210d",
  pageTypeSlug: "relation-property",
  slug: "tag-slugs",
  propertySlug: "tag-slugs",
  definition: "the labels applied to a transaction",
  targetPageTypeSlug: "page-type/monarch-tag",
} as const satisfies RelationProperty
