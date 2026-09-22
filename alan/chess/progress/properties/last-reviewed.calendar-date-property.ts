import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const lastReviewed = {
  id: "01a06582-bd62-70bc-881f-8a745ff478a7",
  type: "page-type/calendar-date-property",
  slug: "last-reviewed",
  propertySlug: "last-reviewed",
  definition: "the day Alan last looked at a part of his chess",
  types: "ts",
} as const satisfies CalendarDateProperty
