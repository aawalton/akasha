import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityWeight = number

export const connectionActivityWeight = {
  id: "01a0658e-c30e-736a-ba20-2c003952dddf",
  pageTypeSlug: "number-property",
  slug: "connection-activity-weight",
  propertySlug: "connection-activity-weight",
  definition: "how much the calibration counts this activity",
  max: null,
} as const satisfies NumberProperty
