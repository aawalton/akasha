import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const spouse = {
  id: "01a18d45-85ae-72e9-9001-e4c9394a0fad",
  type: "page-type/common-language-term",
  slug: "spouse",
  definition: "a husband or wife",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "spouse" },
    { partOfSpeech: "part-of-speech/noun", spelling: "spouses" },
  ],
  createdAt: "2026-10-30T14:45:06.092Z",
  updatedAt: "2026-10-30T14:45:06.092Z",
} as const satisfies CommonLanguageTerm
