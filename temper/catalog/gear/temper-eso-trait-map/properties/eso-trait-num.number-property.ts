import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoTraitNum = {
  id: "01a05fd1-d43a-72e7-b4d2-ee4f35424585",
  type: "page-type/number-property",
  slug: "eso-trait-num",
  propertySlug: "eso-trait-num",
  definition: "the number The Elder Scrolls Online gives a trait",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
