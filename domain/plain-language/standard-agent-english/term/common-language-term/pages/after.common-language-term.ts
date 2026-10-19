import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const after = {
  id: "01a0d3e0-7b13-7b8c-9d28-5cd88ff07d67",
  type: "page-type/common-language-term",
  slug: "after",
  definition: "the preposition naming what a thing comes later than",
  spellings: [
    { partOfSpeech: "part-of-speech/preposition", spelling: "after" },
    { partOfSpeech: "part-of-speech/time-conjunction", spelling: "after" },
  ],
  createdAt: "2026-09-24T14:44:59.283Z",
  updatedAt: "2026-10-19T17:46:50.583Z",
} as const satisfies CommonLanguageTerm
