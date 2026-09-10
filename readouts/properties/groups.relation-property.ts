import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Groups = List<Slug>

export const groups = {
  id: "01a05446-e765-7da7-afdf-68470bd5fc40",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "groups",
  propertySlug: "groups",
  definition: "the groups a reading is drawn in",
  targetPageType: "page-type/readout-group",
} as const satisfies RelationProperty
