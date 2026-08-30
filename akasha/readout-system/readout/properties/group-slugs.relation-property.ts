import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type GroupSlugs = List<Slug>

export const groupSlugs = {
  id: "01a05446-e765-7da7-afdf-68470bd5fc40",
  pageTypeSlug: "relation-property",
  slug: "group-slugs",
  propertySlug: "group-slugs",
  definition: "the groups a reading is drawn in",
  targetPageTypeSlug: "page-type/readout-group",
} as const satisfies RelationProperty
