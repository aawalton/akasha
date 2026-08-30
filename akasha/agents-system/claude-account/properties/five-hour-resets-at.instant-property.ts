import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type FiveHourResetsAt = string

export const fiveHourResetsAt = {
  id: "01a054d8-1d39-70e0-9319-6960fba8d2f8",
  pageTypeSlug: "instant-property",
  slug: "five-hour-resets-at",
  propertySlug: "five-hour-resets-at",
  definition: "when the five-hour allowance refills",
} as const satisfies InstantProperty
