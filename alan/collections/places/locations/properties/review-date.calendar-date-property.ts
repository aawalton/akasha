import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const reviewDate = {
  id: "01a06583-acfb-7984-94e0-db8c9b50a659",
  type: "calendar-date-property",
  slug: "review-date",
  propertySlug: "review-date",
  definition: "the day the person reviewed the place",
  types: "ts",
} as const satisfies CalendarDateProperty
