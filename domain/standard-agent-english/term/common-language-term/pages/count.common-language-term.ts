import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const count = {
  id: "01a0d587-5213-788a-8023-f6e959823f87",
  type: "page-type/common-language-term",
  slug: "count",
  definition: "to find how many there are",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "count" },
    { partOfSpeech: "part-of-speech/verb", spelling: "counts" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "counted" },
  ],
} as const satisfies CommonLanguageTerm
