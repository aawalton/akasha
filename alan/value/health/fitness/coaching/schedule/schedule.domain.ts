import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const schedule = {
  id: "01a09246-d96b-7ff6-ae74-578fb2f6c30a",
  type: "page-type/domain",
  slug: "schedule",
  definition: "Alan's training schedule",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "schedule" },
    { partOfSpeech: "part-of-speech/noun", spelling: "schedules" },
  ],
  parts: ["page-type/schedule-day"],
  createdAt: "2026-09-11T21:01:51.851Z",
  updatedAt: "2026-09-25T13:20:06.000Z",
} as const satisfies Domain
