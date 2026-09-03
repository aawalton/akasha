import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type LastFullScanAt = string

export const lastFullScanAt = {
  id: "01a0675a-f184-78f2-93c4-765d74e25a71",
  pageTypeSlug: "instant-property",
  slug: "last-full-scan-at",
  propertySlug: "last-full-scan-at",
  definition: "when the last sweep of every bag finished",
} as const satisfies InstantProperty
