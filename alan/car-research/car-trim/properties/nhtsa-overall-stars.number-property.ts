import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const nhtsaOverallStars = {
  id: "01a0c547-1352-712d-a055-08519ebee5a0",
  type: "page-type/number-property",
  slug: "nhtsa-overall-stars",
  propertySlug: "nhtsa-overall-stars",
  definition: "how many stars the highway safety administration gave the car overall",
  max: 5,
  types: "ts",
} as const satisfies NumberProperty
