import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const relationshipDepositDate = {
  id: "01a0658d-16bc-76ea-95e1-8ec39a5519e9",
  pageTypeSlug: "calendar-date-property",
  type: "calendar-date-property",
  slug: "relationship-deposit-date",
  propertySlug: "relationship-deposit-date",
  definition: "the day it was made",
  types: "ts",
} as const satisfies CalendarDateProperty
