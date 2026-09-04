import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type TraceCapturedAt = string

export const traceCapturedAt = {
  id: "01a06935-68b4-7424-8765-100bb5902846",
  pageTypeSlug: "instant-property",
  slug: "trace-captured-at",
  propertySlug: "captured-at",
  definition: "when the device fixed this position",
} as const satisfies InstantProperty
