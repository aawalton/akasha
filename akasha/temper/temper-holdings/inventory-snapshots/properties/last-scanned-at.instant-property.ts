import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type LastScannedAt = string

export const lastScannedAt = {
  id: "01a0675a-f185-765a-ad9b-a24a51306d34",
  pageTypeSlug: "instant-property",
  slug: "last-scanned-at",
  propertySlug: "last-scanned-at",
  definition: "when what a holder carries was last read",
} as const satisfies InstantProperty
