import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const usageWindow = {
  id: "01a1556d-45f4-7ae9-a910-c9053fad5e17",
  type: "page-type/domain",
  slug: "usage-window",
  definition: "a time with a limit on what a model account spends",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "usage window" },
    { partOfSpeech: "part-of-speech/noun", spelling: "usage windows" },
    { partOfSpeech: "part-of-speech/noun", spelling: "five-hour window" },
    { partOfSpeech: "part-of-speech/noun", spelling: "five-hour windows" },
    { partOfSpeech: "part-of-speech/noun", spelling: "seven-day window" },
    { partOfSpeech: "part-of-speech/noun", spelling: "seven-day windows" },
    { partOfSpeech: "part-of-speech/verb", spelling: "reset", scope: "page-type/model-account" },
    { partOfSpeech: "part-of-speech/verb", spelling: "resets", scope: "page-type/model-account" },
  ],
  createdAt: "2026-10-19T18:29:47.122Z",
  updatedAt: "2026-10-19T18:29:47.122Z",
} as const satisfies Domain
