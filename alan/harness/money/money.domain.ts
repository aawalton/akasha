import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const money = {
  id: "01a0675b-16f3-7280-8bde-5f9dbd22d675",
  type: "page-type/domain",
  slug: "money",
  definition: "what Alan has, owes and spends",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "money" }],
} as const satisfies Domain
