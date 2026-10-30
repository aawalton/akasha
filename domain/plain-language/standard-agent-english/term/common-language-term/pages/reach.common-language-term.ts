import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const reach = {
  id: "01a18d5e-9514-7bd6-a1a3-c7b6ca11a781",
  type: "page-type/common-language-term",
  slug: "reach",
  definition: "to get as far as",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "reach" },
    { partOfSpeech: "part-of-speech/verb", spelling: "reaches" },
    { partOfSpeech: "part-of-speech/verb", spelling: "reached" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "reached" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "reaching" },
  ],
  createdAt: "2026-10-30T15:12:28.434Z",
  updatedAt: "2026-10-30T15:12:28.434Z",
} as const satisfies CommonLanguageTerm
