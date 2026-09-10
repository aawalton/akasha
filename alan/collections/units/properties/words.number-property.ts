import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type Words = number

export const words = {
  id: "01a063de-2c60-7015-88f0-093a352a28a0",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "words",
  propertySlug: "words",
  definition: "how many words one of a unit is worth",
  max: null,
} as const satisfies NumberProperty
