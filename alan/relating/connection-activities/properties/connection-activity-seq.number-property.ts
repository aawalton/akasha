import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivitySeq = number

export const connectionActivitySeq = {
  id: "01a0658e-c30e-7dff-a22d-3fe7c89f2028",
  pageTypeSlug: "number-property",
  slug: "connection-activity-seq",
  propertySlug: "connection-activity-seq",
  definition: "where this activity stands in the order they are listed",
  max: null,
} as const satisfies NumberProperty
