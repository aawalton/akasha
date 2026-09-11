import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const modelFamily = {
  id: "01a053eb-6b27-7641-97ae-c865663ac0d5",
  type: "relation-property",
  slug: "model-family",
  propertySlug: "model-family",
  definition: "a slug naming a model family",
  targetPageType: "page-type/model-family",
  types: "ts",
} as const satisfies RelationProperty
