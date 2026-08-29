import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type AttributeSlugs = List<Slug>

export const attributeSlugs = {
  id: "01a04fe8-cebf-728c-90c6-d36708b2a983",
  pageTypeSlug: "relation-property",
  slug: "attribute-slugs",
  definition: "the attributes an edge kind carries",
  targetPageTypeSlug: "page-type/graph-attribute",
} as const satisfies RelationProperty
