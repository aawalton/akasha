import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type ReviewDate = string

export const reviewDate = {
  id: "01a06583-acfb-7984-94e0-db8c9b50a659",
  pageTypeSlug: "calendar-date-property",
  slug: "review-date",
  propertySlug: "review-date",
  definition: "the day the person reviewed the place",
} as const satisfies CalendarDateProperty
