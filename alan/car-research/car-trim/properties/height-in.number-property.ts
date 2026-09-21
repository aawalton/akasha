import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const heightIn = {
  id: "01a0c546-1549-7fcb-befe-3a7e60bcc4c7",
  type: "page-type/number-property",
  slug: "height-in",
  propertySlug: "height-in",
  definition: "how tall the car is, in inches",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
