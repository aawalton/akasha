import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export type LastReviewed = string

export const lastReviewed = {
  id: "01a06582-bd62-70bc-881f-8a745ff478a7",
  pageTypeSlug: "calendar-date-property",
  type: "calendar-date-property",
  slug: "last-reviewed",
  propertySlug: "last-reviewed",
  definition: "the day a part of Alan's chess was last looked at",
} as const satisfies CalendarDateProperty
