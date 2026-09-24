import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanwaltonCom = {
  id: "01a0d5b8-6728-7476-b095-3af38af24d8f",
  type: "page-type/domain",
  slug: "alanwalton-com",
  definition: "Alan's service",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "alanwalton.com" }],
} as const satisfies Domain
