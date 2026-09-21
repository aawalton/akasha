import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const widthIn = {
  id: "01a0c546-d137-75f6-80f4-62592aca5d16",
  type: "page-type/number-property",
  slug: "width-in",
  propertySlug: "width-in",
  definition: "how wide the car is across the body, in inches",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
