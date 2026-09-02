import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type GroupSlugs = List<Slug>

export const groupSlugs = {
  id: "01a05446-e765-7da7-afdf-68470bd5fc40",
  pageTypeSlug: "relation-property",
  slug: "group-slugs",
  propertySlug: "group-slugs",
  definition: "the groups a reading is drawn in",
  targetPageTypeSlug: "page-type/readout-group",
} as const satisfies RelationProperty
