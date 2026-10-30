import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const lose = {
  id: "01a18d58-1013-704c-b2e8-243a8d1e187a",
  type: "page-type/common-language-term",
  slug: "lose",
  definition: "to have less of a thing than before",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "lose" },
    { partOfSpeech: "part-of-speech/verb", spelling: "loses" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "lost" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "losing" },
  ],
  createdAt: "2026-10-30T15:05:21.167Z",
  updatedAt: "2026-10-30T15:05:21.167Z",
} as const satisfies CommonLanguageTerm
