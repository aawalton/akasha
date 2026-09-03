import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CategorySlug = Slug

export const categorySlug = {
  id: "01a0680b-2b00-700b-b148-5a2c9e7d210c",
  pageTypeSlug: "relation-property",
  slug: "category-slug",
  propertySlug: "category-slug",
  definition: "what a transaction counts as",
  targetPageTypeSlug: "page-type/monarch-category",
} as const satisfies RelationProperty
