import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const prose = {
  id: "01a0d8c3-aba6-78fa-a148-453817106626",
  type: "page-type/domain",
  slug: "prose",
  definition: "text written in Standard Agent English",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "prose" }],
  createdAt: "2026-09-25T13:31:37.254Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies Domain
