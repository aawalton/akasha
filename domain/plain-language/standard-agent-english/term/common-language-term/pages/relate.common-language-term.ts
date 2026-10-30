import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const relate = {
  id: "01a18d55-f614-7145-bab0-3cf7caf97a45",
  type: "page-type/common-language-term",
  slug: "relate",
  definition: "have to do with another thing",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "relate" },
    { partOfSpeech: "part-of-speech/verb", spelling: "relates" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "related" },
  ],
  createdAt: "2026-10-30T15:03:03.441Z",
  updatedAt: "2026-10-30T15:03:03.441Z",
} as const satisfies CommonLanguageTerm
