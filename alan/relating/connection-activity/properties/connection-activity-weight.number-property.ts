import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const connectionActivityWeight = {
  id: "01a0658e-c30e-736a-ba20-2c003952dddf",
  type: "page-type/number-property",
  slug: "connection-activity-weight",
  propertySlug: "connection-activity-weight",
  definition: "how much the calibration counts this activity",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
