import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type LastReviewed = string

export const lastReviewed = {
  id: "01a06582-bd62-70bc-881f-8a745ff478a7",
  pageTypeSlug: "calendar-date-property",
  slug: "last-reviewed",
  propertySlug: "last-reviewed",
  definition: "the day a part of Alan's chess was last looked at",
} as const satisfies CalendarDateProperty
