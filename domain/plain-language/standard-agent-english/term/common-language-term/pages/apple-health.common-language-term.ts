import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const appleHealth = {
  id: "01a18d77-a510-7658-a6d0-a4ceb3ecb441",
  type: "page-type/common-language-term",
  slug: "apple-health",
  definition: "the program that keeps health samples on a phone",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Apple Health" }],
  createdAt: "2026-10-30T15:39:50.927Z",
  updatedAt: "2026-10-30T15:39:50.927Z",
} as const satisfies CommonLanguageTerm
