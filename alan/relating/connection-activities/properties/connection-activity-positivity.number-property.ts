import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityPositivity = number

export const connectionActivityPositivity = {
  id: "01a0658e-c30e-7d24-853d-513e68803ae2",
  pageTypeSlug: "number-property",
  slug: "connection-activity-positivity",
  propertySlug: "connection-activity-positivity",
  definition: "how warm the whole of it is",
  max: null,
} as const satisfies NumberProperty
