import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const map = {
  id: "01a18d8b-6651-7c33-8668-a196329efa77",
  type: "page-type/common-language-term",
  slug: "map",
  definition: "a picture that shows where places are",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "map" },
    { partOfSpeech: "part-of-speech/noun", spelling: "maps" },
  ],
  createdAt: "2026-10-30T16:01:25.582Z",
  updatedAt: "2026-10-30T16:01:25.582Z",
} as const satisfies CommonLanguageTerm
