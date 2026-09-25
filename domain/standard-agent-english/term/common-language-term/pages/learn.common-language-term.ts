import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const learn = {
  id: "01a0d900-4440-7fd7-8ee2-15f0d136670f",
  type: "page-type/common-language-term",
  slug: "learn",
  definition: "to come to know or be able to do",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "learn" },
    { partOfSpeech: "part-of-speech/verb", spelling: "learns" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "learned" },
  ],
} as const satisfies CommonLanguageTerm
