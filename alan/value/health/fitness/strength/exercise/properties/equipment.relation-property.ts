import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const equipment = {
  id: "01a0657e-2bbf-71e9-85bc-e347194f49ca",
  type: "page-type/relation-property",
  slug: "equipment",
  propertySlug: "equipment",
  definition: "the kit loading the movement",
  targetPageType: "page-type/strength-exercise-implement",
  types: "ts",
} as const satisfies RelationProperty
