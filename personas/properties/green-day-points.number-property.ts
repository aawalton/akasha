import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const greenDayPoints = {
  id: "01a05395-58b3-7e1e-b765-ab3c7b87daab",
  type: "number-property",
  slug: "green-day-points",
  propertySlug: "green-day-points",
  definition: "how many points a persona must earn in a day for it to draw green",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
