import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const disability = {
  id: "01a18d8f-5427-7a18-a968-7c624e7d2fe7",
  type: "page-type/common-language-term",
  slug: "disability",
  definition: "a loss of what a person's body or mind can do",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "disability" },
    { partOfSpeech: "part-of-speech/noun", spelling: "disabilities" },
  ],
  createdAt: "2026-10-30T16:05:43.078Z",
  updatedAt: "2026-10-30T16:05:43.078Z",
} as const satisfies CommonLanguageTerm
