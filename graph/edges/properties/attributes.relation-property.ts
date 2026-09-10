import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

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
