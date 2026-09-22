import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const schedule = {
  id: "01a09246-d96b-7ff6-ae74-578fb2f6c30a",
  type: "page-type/domain",
  slug: "schedule",
  definition: "the rotation Alan's training repeats on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "schedule" },
    { partOfSpeech: "part-of-speech/noun", spelling: "schedules" },
  ],
  parts: ["page-type/schedule-day"],
} as const satisfies Domain
