import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const linkedin = {
  id: "01a18da8-9410-7ca1-b03c-0f3f088cfa5a",
  type: "page-type/common-language-term",
  slug: "linkedin",
  definition: "a website where people show their jobs",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "LinkedIn" }],
  createdAt: "2026-10-30T16:33:17.839Z",
  updatedAt: "2026-10-30T16:33:17.839Z",
} as const satisfies CommonLanguageTerm
