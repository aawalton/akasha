import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const bondAttribute = {
  id: "01a0c63b-e1cd-757e-86a7-98e40979de8e",
  type: "page-type/relation-property",
  slug: "bond-attribute",
  propertySlug: "attribute",
  definition: "the attribute of its own a bond couples",
  targetPageType: "page-type/game-attribute",
  types: "ts",
} as const satisfies RelationProperty
