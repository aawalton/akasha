import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type PurchaseDate = string

export const purchaseDate = {
  id: "01a0658c-329a-79ce-ae02-08924526a844",
  pageTypeSlug: "calendar-date-property",
  slug: "purchase-date",
  propertySlug: "purchase-date",
  definition: "the day Alan bought it",
} as const satisfies CalendarDateProperty
