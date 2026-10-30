import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const skip = {
  id: "01a18d62-41d8-76e4-9732-6d3525466678",
  type: "page-type/common-language-term",
  slug: "skip",
  definition: "to pass over something without doing it",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "skip" },
    { partOfSpeech: "part-of-speech/verb", spelling: "skips" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "skipped" },
  ],
  createdAt: "2026-10-30T15:16:29.271Z",
  updatedAt: "2026-10-30T15:16:29.271Z",
} as const satisfies CommonLanguageTerm
