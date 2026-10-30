import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const multiply = {
  id: "01a18db4-0e54-78dd-ab50-3a0a1464ecea",
  type: "page-type/common-language-term",
  slug: "multiply",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "multiply" },
    { partOfSpeech: "part-of-speech/verb", spelling: "multiplies" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "multiplied" },
  ],
  createdAt: "2026-10-30T16:45:50.035Z",
  updatedAt: "2026-10-30T16:45:50.035Z",
} as const satisfies CommonLanguageTerm
