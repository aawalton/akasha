import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ClientSeq = number

export const clientSeq = {
  id: "01a06935-68b4-77f8-9df6-79b2d60bf54b",
  pageTypeSlug: "number-property",
  slug: "client-seq",
  propertySlug: "client-seq",
  definition: "the count this device gave the trace, rising by one for each it takes",
  max: null,
} as const satisfies NumberProperty
