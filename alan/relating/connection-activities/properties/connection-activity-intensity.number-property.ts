import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityIntensity = number

export const connectionActivityIntensity = {
  id: "01a0658e-c30e-707c-b6bd-1a2dde58aab2",
  pageTypeSlug: "number-property",
  slug: "connection-activity-intensity",
  propertySlug: "connection-activity-intensity",
  definition: "how much of him it takes up",
  max: null,
} as const satisfies NumberProperty
