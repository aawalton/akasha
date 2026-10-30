import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hand = {
  id: "01a18dba-047e-7f01-8f8c-a0e862034066",
  type: "page-type/common-language-term",
  slug: "hand",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "hand" },
    { partOfSpeech: "part-of-speech/noun", spelling: "hands" },
  ],
  createdAt: "2026-10-30T16:52:20.733Z",
  updatedAt: "2026-10-30T16:52:20.733Z",
} as const satisfies CommonLanguageTerm
