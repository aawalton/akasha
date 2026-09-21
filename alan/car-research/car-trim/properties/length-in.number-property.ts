import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const lengthIn = {
  id: "01a0c546-465a-77ee-9e41-3c834ea242c5",
  type: "page-type/number-property",
  slug: "length-in",
  propertySlug: "length-in",
  definition: "how long the car is nose to tail, in inches",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
