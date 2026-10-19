import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const yes = {
  id: "01a1559e-d9af-775d-b1b5-45f5d8ea4cc7",
  type: "page-type/common-language-term",
  slug: "yes",
  definition: "a word that agrees",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "yes" }],
  createdAt: "2026-10-19T19:23:56.207Z",
  updatedAt: "2026-10-19T19:23:56.207Z",
} as const satisfies CommonLanguageTerm
