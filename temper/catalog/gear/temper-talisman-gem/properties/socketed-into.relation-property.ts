import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const socketedInto = {
  id: "01a0d986-17f8-75bc-a66a-2c4d376a3c45",
  type: "page-type/relation-property",
  slug: "socketed-into",
  propertySlug: "socketed-into",
  definition: "the set whose piece a gem is socketed into",
  targetPageType: "page-type/temper-set",
  types: "ts",
} as const satisfies RelationProperty
