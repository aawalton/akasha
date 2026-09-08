import type { CalendarDateProperty } from "@akasha/pages/calendar-date-property"

export type CoachingNoteDate = string

export const coachingNoteDate = {
  id: "01a08172-81d8-724b-bb70-b582888d0934",
  pageTypeSlug: "calendar-date-property",
  slug: "coaching-note-date",
  propertySlug: "coaching-note-date",
  definition: "the day a note was taken",
} as const satisfies CalendarDateProperty
