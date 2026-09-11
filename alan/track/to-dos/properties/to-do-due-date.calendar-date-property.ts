import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const toDoDueDate = {
  id: "01a065a1-49b7-7308-b0b9-3e7b226f7164",
  type: "calendar-date-property",
  slug: "to-do-due-date",
  propertySlug: "to-do-due-date",
  definition: "the day a to-do comes due",
  types: "ts",
} as const satisfies CalendarDateProperty
