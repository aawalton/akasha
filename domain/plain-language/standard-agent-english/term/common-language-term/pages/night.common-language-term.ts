import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const night = {
  id: "01a18d8c-966c-72dc-9051-d97e8413d2dd",
  type: "page-type/common-language-term",
  slug: "night",
  definition: "the dark hours between one day and the next",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "night" },
    { partOfSpeech: "part-of-speech/noun", spelling: "nights" },
  ],
  createdAt: "2026-10-30T16:02:43.435Z",
  updatedAt: "2026-10-30T16:02:43.435Z",
} as const satisfies CommonLanguageTerm
