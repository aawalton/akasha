import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Attributes = List<Slug>

export const attributes = {
  id: "01a04fe8-cebf-728c-90c6-d36708b2a983",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "attributes",
  propertySlug: "attributes",
  definition: "the attributes an edge kind carries",
  targetPageType: "page-type/graph-attribute",
} as const satisfies RelationProperty
