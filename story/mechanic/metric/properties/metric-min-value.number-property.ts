import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const metricMinValue = {
  id: "01a0ca08-26b7-79b0-93ca-073878a31c13",
  type: "page-type/number-property",
  slug: "metric-min-value",
  propertySlug: "min-value",
  definition: "the least a metric may go",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
