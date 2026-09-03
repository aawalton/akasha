import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type RelationshipDepositDate = string

export const relationshipDepositDate = {
  id: "01a0658d-16bc-76ea-95e1-8ec39a5519e9",
  pageTypeSlug: "calendar-date-property",
  slug: "relationship-deposit-date",
  propertySlug: "relationship-deposit-date",
  definition: "the day it was made",
} as const satisfies CalendarDateProperty
