import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const horsepower = {
  id: "01a0c546-2614-79a7-8d26-bbe3700991eb",
  type: "page-type/number-property",
  slug: "horsepower",
  propertySlug: "horsepower",
  definition: "how much power the car makes, in horsepower",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
