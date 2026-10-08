import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const spend = {
  id: "01a0d8ff-77c7-7a27-8bd2-d5664dee8633",
  type: "page-type/common-language-term",
  slug: "spend",
  definition: "to use up",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "spend" },
    { partOfSpeech: "part-of-speech/verb", spelling: "spends" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "spent" },
  ],
  createdAt: "2026-09-25T14:36:56.135Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
