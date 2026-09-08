import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type GroupSlugs = List<Slug>

export const groupSlugs = {
  id: "01a05446-e765-7da7-afdf-68470bd5fc40",
  pageTypeSlug: "relation-property",
  slug: "group-slugs",
  propertySlug: "group-slugs",
  definition: "the groups a reading is drawn in",
  targetPageTypeSlug: "page-type/readout-group",
} as const satisfies RelationProperty
