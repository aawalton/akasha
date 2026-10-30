import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const calendarEvent = {
  id: "01a18d69-df65-7002-93c4-eab56dda74b4",
  type: "page-type/domain",
  slug: "calendar-event",
  definition: "a named time on a calendar",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "calendar event" },
    { partOfSpeech: "part-of-speech/noun", spelling: "calendar events" },
  ],
  createdAt: "2026-10-30T15:24:48.356Z",
  updatedAt: "2026-10-30T15:24:48.356Z",
} as const satisfies Domain
