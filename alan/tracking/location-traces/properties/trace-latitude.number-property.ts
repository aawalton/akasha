import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TraceLatitude = number

export const traceLatitude = {
  id: "01a06935-68b4-7283-84ec-2fcf5e17570b",
  pageTypeSlug: "number-property",
  slug: "trace-latitude",
  propertySlug: "latitude",
  definition: "how far north or south of the equator the trace was taken",
  max: null,
} as const satisfies NumberProperty
