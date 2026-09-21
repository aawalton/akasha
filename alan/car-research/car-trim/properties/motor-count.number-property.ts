import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const motorCount = {
  id: "01a0c546-5770-7706-9ea7-45509525ce05",
  type: "page-type/number-property",
  slug: "motor-count",
  propertySlug: "motor-count",
  definition: "how many electric motors move the car",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
