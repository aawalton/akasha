import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const modelFamily = {
  id: "01a053eb-6b27-7641-97ae-c865663ac0d5",
  type: "page-type/relation-property",
  slug: "model-family",
  propertySlug: "model-family",
  definition: "a page's model family",
  targetPageType: "page-type/model-family",
  types: "ts",
} as const satisfies RelationProperty
