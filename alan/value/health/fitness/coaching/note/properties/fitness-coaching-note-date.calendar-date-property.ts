import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const fitnessCoachingNoteDate = {
  id: "01a08172-81d8-724b-bb70-b582888d0934",
  type: "page-type/calendar-date-property",
  slug: "fitness-coaching-note-date",
  propertySlug: "date",
  definition: "the day a note was taken",
  types: "ts",
} as const satisfies CalendarDateProperty
