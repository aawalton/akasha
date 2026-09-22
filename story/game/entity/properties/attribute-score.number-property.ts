import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const attributeScore = {
  id: "01a0c634-a49e-7412-a635-6e4fb133fa16",
  type: "page-type/number-property",
  slug: "attribute-score",
  propertySlug: "score",
  definition: "what an entity has in an attribute",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
