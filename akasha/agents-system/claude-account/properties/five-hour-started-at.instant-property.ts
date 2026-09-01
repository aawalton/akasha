import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type FiveHourStartedAt = string

export const fiveHourStartedAt = {
  id: "01a054d8-1d39-7510-8037-6c85b558240d",
  pageTypeSlug: "instant-property",
  slug: "five-hour-started-at",
  propertySlug: "five-hour-started-at",
  definition: "when the five-hour window opened",
} as const satisfies InstantProperty
