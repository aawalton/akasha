import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export type FitnessCoachingNoteDate = string

export const fitnessCoachingNoteDate = {
  id: "01a08172-81d8-724b-bb70-b582888d0934",
  pageTypeSlug: "calendar-date-property",
  type: "calendar-date-property",
  slug: "fitness-coaching-note-date",
  propertySlug: "date",
  definition: "the day a note was taken",
} as const satisfies CalendarDateProperty
