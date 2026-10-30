import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const genre = {
  id: "01a18d99-d0d3-76e8-98d9-bd0195d81306",
  type: "page-type/common-language-term",
  slug: "genre",
  definition: "a style of music or writing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "genre" },
    { partOfSpeech: "part-of-speech/noun", spelling: "genres" },
  ],
  createdAt: "2026-10-30T16:17:10.353Z",
  updatedAt: "2026-10-30T16:17:10.353Z",
} as const satisfies CommonLanguageTerm
