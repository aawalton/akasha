import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const clientSeq = {
  id: "01a06935-68b4-77f8-9df6-79b2d60bf54b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "client-seq",
  propertySlug: "client-seq",
  definition: "the count this device gave the trace, rising by one for each it takes",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
