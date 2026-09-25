import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const prose = {
  id: "01a0d8c3-aba6-78fa-a148-453817106626",
  type: "page-type/domain",
  slug: "prose",
  definition: "text written in Standard Agent English",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "prose" }],
} as const satisfies Domain
