import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type EndedAt = string

export const endedAt = {
  id: "01a060fb-0410-7cc7-9f94-55cf8505736f",
  pageTypeSlug: "instant-property",
  slug: "ended-at",
  propertySlug: "ended-at",
  definition: "when the stretch a reading covers ended",
} as const satisfies InstantProperty
