import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const study = {
  id: "01a0d8a8-b86e-7180-9309-fc1e25abcaf2",
  type: "page-type/common-language-term",
  slug: "study",
  definition: "to read something closely to learn it",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "study" },
    { partOfSpeech: "part-of-speech/verb", spelling: "studies" },
  ],
  createdAt: "2026-09-25T13:02:11.054Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
