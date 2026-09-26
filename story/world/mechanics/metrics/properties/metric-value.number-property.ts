import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const metricValue = {
  id: "01a0ca08-17ae-75cb-a9c4-04a849de265f",
  type: "page-type/number-property",
  slug: "metric-value",
  propertySlug: "value",
  definition: "the number a metric has now",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
