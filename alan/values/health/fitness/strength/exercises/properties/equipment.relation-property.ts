import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const equipment = {
  id: "01a0657e-2bbf-71e9-85bc-e347194f49ca",
  type: "relation-property",
  slug: "equipment",
  propertySlug: "equipment",
  definition: "the kit the movement is loaded with",
  targetPageType: "page-type/strength-exercise-implement",
  types: "ts",
} as const satisfies RelationProperty
