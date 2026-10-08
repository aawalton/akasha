import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const prove = {
  id: "01a0d97e-c061-7bd9-a070-ce430b83f859",
  type: "page-type/common-language-term",
  slug: "prove",
  definition: "to show that something is true",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "prove" },
    { partOfSpeech: "part-of-speech/verb", spelling: "proves" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "proved" },
  ],
  createdAt: "2026-09-25T16:55:57.793Z",
  updatedAt: "2026-09-25T16:56:02.000Z",
} as const satisfies CommonLanguageTerm
