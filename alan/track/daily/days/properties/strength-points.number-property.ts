import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type StrengthPoints = number

export const strengthPoints = {
  id: "01a05fd8-c30f-7d2e-97b5-2213e2ed7884",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "strength-points",
  propertySlug: "strength-points",
  definition: "the strength earned on a day",
  max: null,
} as const satisfies NumberProperty
