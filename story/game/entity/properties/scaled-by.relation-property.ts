import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const scaledBy = {
  id: "01a0c63a-55ba-71ac-9d92-d2f141974869",
  type: "page-type/relation-property",
  slug: "scaled-by",
  propertySlug: "scaling",
  definition: "the attribute growing a thing's numbers",
  targetPageType: "page-type/game-attribute",
  types: "ts",
} as const satisfies RelationProperty
