import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Category = Slug

export const category = {
  id: "01a0680b-2b00-700b-b148-5a2c9e7d210c",
  pageTypeSlug: "relation-property",
  slug: "category",
  propertySlug: "category",
  definition: "what a transaction counts as",
  targetPageType: "page-type/monarch-category",
} as const satisfies RelationProperty
