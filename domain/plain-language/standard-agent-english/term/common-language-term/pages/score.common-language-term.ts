import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const score = {
  id: "01a18d5a-0bf3-7b98-a1a7-4e25fa8133f0",
  type: "page-type/common-language-term",
  slug: "score",
  definition: "the points a thing earns",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "score" },
    { partOfSpeech: "part-of-speech/noun", spelling: "scores" },
  ],
  createdAt: "2026-10-30T15:07:31.186Z",
  updatedAt: "2026-10-30T15:07:31.186Z",
} as const satisfies CommonLanguageTerm
