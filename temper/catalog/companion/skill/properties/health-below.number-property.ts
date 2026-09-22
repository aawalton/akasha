import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const healthBelow = {
  id: "01a06193-6cae-7ee6-b94c-69630c96ddf2",
  type: "page-type/number-property",
  slug: "health-below",
  propertySlug: "below",
  definition: "the share of health below which a test holds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
