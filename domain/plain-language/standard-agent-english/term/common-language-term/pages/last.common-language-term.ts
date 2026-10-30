import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const last = {
  id: "01a0d9ca-f5ab-7baa-b51a-677aca9f826b",
  type: "page-type/common-language-term",
  slug: "last",
  definition: "most recent",
  spellings: [
    { partOfSpeech: "part-of-speech/adjective", spelling: "last" },
    { partOfSpeech: "part-of-speech/time-adverb", spelling: "last" },
  ],
  createdAt: "2026-09-25T18:19:12.171Z",
  updatedAt: "2026-10-30T17:04:57.788Z",
} as const satisfies CommonLanguageTerm
