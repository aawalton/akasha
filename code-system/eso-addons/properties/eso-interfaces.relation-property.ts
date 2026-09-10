import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const esoInterfaces = {
  id: "01a06036-9b78-7e16-a4d4-1b73c48a5c05",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "eso-interfaces",
  propertySlug: "interfaces",
  definition: "the XML documents an addon loads",
  targetPageType: "page-type/eso-interface",
  types: "ts",
} as const satisfies RelationProperty
