import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const seatingCapacity = {
  id: "01a0c547-3583-7693-ad87-93033ae7ed21",
  type: "page-type/number-property",
  slug: "seating-capacity",
  propertySlug: "seating-capacity",
  definition: "how many people the car seats",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
