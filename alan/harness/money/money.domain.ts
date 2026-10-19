import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const money = {
  id: "01a0675b-16f3-7280-8bde-5f9dbd22d675",
  type: "page-type/domain",
  slug: "money",
  definition: "Alan's money",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "money" }],
  parts: ["page-type/plaid-item"],
  createdAt: "2026-09-03T13:00:18.035Z",
  updatedAt: "2026-10-19T13:44:47.983Z",
} as const satisfies Domain
