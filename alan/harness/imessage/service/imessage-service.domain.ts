import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imessageService = {
  id: "01a0d5b8-6728-78f1-856c-a52d8139ae13",
  type: "page-type/domain",
  slug: "imessage-service",
  definition: "an external service where people chat",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "iMessage" }],
  createdAt: "2026-09-24T23:20:27.176Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Domain
