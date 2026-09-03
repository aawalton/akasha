import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type ToDoDueDate = string

export const toDoDueDate = {
  id: "01a065a1-49b7-7308-b0b9-3e7b226f7164",
  pageTypeSlug: "calendar-date-property",
  slug: "to-do-due-date",
  propertySlug: "to-do-due-date",
  definition: "the day a to-do comes due",
} as const satisfies CalendarDateProperty
