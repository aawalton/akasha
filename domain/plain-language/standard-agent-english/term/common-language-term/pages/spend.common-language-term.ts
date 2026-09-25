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
} as const satisfies CommonLanguageTerm
