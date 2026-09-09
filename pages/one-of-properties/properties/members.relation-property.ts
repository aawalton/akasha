import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"
import type { List } from "../../types/page-properties/page-property.page-type.ts"
import type { PageProperty } from "../../types/properties/page-property.relation-property.ts"

export type Members = List<PageProperty>

export const members = {
  id: "01a062b2-e0c9-78a5-b56b-6dc7519eded7",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "members",
  propertySlug: "members",
  definition: "a slug naming a property a one-of property admits a value of",
  targetPageType: "page-type/page-property",
} as const satisfies RelationProperty
