import type { Slug } from "@akasha/pages-system/page/slug"
import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type AttributeSlugs = List<Slug>

export const attributeSlugs = {
  id: "01a04fe8-cebf-728c-90c6-d36708b2a983",
  pageTypeSlug: "relation-property",
  slug: "attribute-slugs",
  propertySlug: "attribute-slugs",
  definition: "the attributes an edge kind carries",
  targetPageTypeSlug: "page-type/graph-attribute",
} as const satisfies RelationProperty
