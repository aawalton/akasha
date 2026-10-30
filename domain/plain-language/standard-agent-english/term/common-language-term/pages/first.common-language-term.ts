import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const first = {
  id: "01a18d4d-c74b-7521-b54c-3dafd24b4da3",
  type: "page-type/common-language-term",
  slug: "first",
  definition: "coming before every other",
  spellings: [
    { partOfSpeech: "part-of-speech/adjective", spelling: "first" },
    { partOfSpeech: "part-of-speech/time-adverb", spelling: "first" },
  ],
  createdAt: "2026-10-30T14:54:07.178Z",
  updatedAt: "2026-10-30T17:18:49.823Z",
} as const satisfies CommonLanguageTerm
