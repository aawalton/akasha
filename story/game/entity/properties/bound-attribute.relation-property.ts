import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const boundAttribute = {
  id: "01a0c63b-f68f-7f34-9544-b056e963056e",
  type: "page-type/relation-property",
  slug: "bound-attribute",
  propertySlug: "bound-attribute",
  definition: "the attribute of the other one a bond couples to",
  targetPageType: "page-type/game-attribute",
  types: "ts",
} as const satisfies RelationProperty
