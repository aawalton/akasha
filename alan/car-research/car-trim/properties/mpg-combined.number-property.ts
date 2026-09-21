import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const mpgCombined = {
  id: "01a0c546-67bf-7741-b142-c9d027f3f629",
  type: "page-type/number-property",
  slug: "mpg-combined",
  propertySlug: "mpg-combined",
  definition: "how far the car goes on a gallon over the EPA's mixed cycle, in miles",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
