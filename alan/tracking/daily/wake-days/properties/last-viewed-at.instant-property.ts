import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type LastViewedAt = string

export const lastViewedAt = {
  id: "01a05fd8-c30f-7828-92eb-f4b80101700c",
  pageTypeSlug: "instant-property",
  slug: "last-viewed-at",
  propertySlug: "last-viewed-at",
  definition: "when a page was last opened",
} as const satisfies InstantProperty
