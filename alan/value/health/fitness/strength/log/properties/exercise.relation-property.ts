import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const exercise = {
  id: "01a06580-66fd-7e47-b51f-4d1b33a2ba66",
  type: "page-type/relation-property",
  slug: "exercise",
  propertySlug: "exercise",
  definition: "a record's movement",
  targetPageType: "page-type/strength-exercise",
  types: "ts",
} as const satisfies RelationProperty
