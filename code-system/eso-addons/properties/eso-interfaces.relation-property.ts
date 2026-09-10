import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type EsoInterfaces = List<Slug>

export const esoInterfaces = {
  id: "01a06036-9b78-7e16-a4d4-1b73c48a5c05",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "eso-interfaces",
  propertySlug: "interfaces",
  definition: "the XML documents an addon loads",
  targetPageType: "page-type/eso-interface",
} as const satisfies RelationProperty
