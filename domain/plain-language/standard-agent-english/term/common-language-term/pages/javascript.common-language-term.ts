import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const javascript = {
  id: "01a18d84-edfa-78c6-96d0-2bf1660e30a9",
  type: "page-type/common-language-term",
  slug: "javascript",
  definition: "the language for code that web browsers run",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "JavaScript" }],
  createdAt: "2026-10-30T15:54:21.561Z",
  updatedAt: "2026-10-30T15:54:21.561Z",
} as const satisfies CommonLanguageTerm
