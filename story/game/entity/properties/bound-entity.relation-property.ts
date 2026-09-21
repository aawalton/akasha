import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const boundEntity = {
  id: "01a0c63b-cd7b-7e55-a800-340fe1e73f90",
  type: "page-type/relation-property",
  slug: "bound-entity",
  propertySlug: "entity",
  definition: "the other one a bond reaches",
  targetPageType: "page-type/game-entity",
  types: "ts",
} as const satisfies RelationProperty
