import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type GreenDayPoints = number

export const greenDayPoints = {
  id: "01a05395-58b3-7e1e-b765-ab3c7b87daab",
  pageTypeSlug: "number-property",
  slug: "green-day-points",
  propertySlug: "green-day-points",
  definition: "how many points a persona must earn in a day for it to draw green",
  max: null,
} as const satisfies NumberProperty
