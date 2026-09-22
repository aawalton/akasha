import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const metricMaxValue = {
  id: "01a0ca08-358d-701c-881a-c70f0ec618a7",
  type: "page-type/number-property",
  slug: "metric-max-value",
  propertySlug: "max-value",
  definition: "the most a metric may reach",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
