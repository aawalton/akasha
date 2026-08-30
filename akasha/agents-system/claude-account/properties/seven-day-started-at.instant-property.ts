import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type SevenDayStartedAt = string

export const sevenDayStartedAt = {
  id: "01a054d8-1d39-75d7-8137-faece255822a",
  pageTypeSlug: "instant-property",
  slug: "seven-day-started-at",
  propertySlug: "seven-day-started-at",
  definition: "when the seven-day window opened",
} as const satisfies InstantProperty
