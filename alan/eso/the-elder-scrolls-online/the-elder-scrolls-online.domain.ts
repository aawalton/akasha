import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const theElderScrollsOnline = {
  id: "01a0d4d6-ef46-7ef6-8ce8-101f9600f3c1",
  type: "page-type/domain",
  slug: "the-elder-scrolls-online",
  definition: "a game",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "The Elder Scrolls Online" }],
} as const satisfies Domain
