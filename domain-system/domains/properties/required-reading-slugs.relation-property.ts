import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RequiredReadingSlugs = List<Slug>

export const requiredReadingSlugs = {
  id: "01a06935-8f86-7fa7-86dd-18b915450047",
  pageTypeSlug: "relation-property",
  slug: "required-reading-slugs",
  propertySlug: "required-reading-slugs",
  definition: "the other domains a domain's readers must have read",
  targetPageTypeSlug: "page-type/domain",
} as const satisfies RelationProperty
