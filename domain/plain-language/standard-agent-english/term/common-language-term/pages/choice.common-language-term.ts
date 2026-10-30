import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const choice = {
  id: "01a18d7a-9cd9-7d8f-8b80-62b85c413dbf",
  type: "page-type/common-language-term",
  slug: "choice",
  definition: "one of the things a person can pick",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "choice" },
    { partOfSpeech: "part-of-speech/noun", spelling: "choices" },
  ],
  createdAt: "2026-10-30T15:43:05.432Z",
  updatedAt: "2026-10-30T15:43:05.432Z",
} as const satisfies CommonLanguageTerm
