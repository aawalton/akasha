import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type SevenDayResetsAt = string

export const sevenDayResetsAt = {
  id: "01a054d8-1d39-7e80-aa56-6c076151c9dc",
  pageTypeSlug: "instant-property",
  slug: "seven-day-resets-at",
  propertySlug: "seven-day-resets-at",
  definition: "when the seven-day allowance refills",
} as const satisfies InstantProperty
