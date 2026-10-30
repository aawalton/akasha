import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const usState = {
  id: "01a18d80-2a99-7913-bc12-71f42e438315",
  type: "page-type/common-language-term",
  slug: "us-state",
  definition: "one of the fifty states that make up the United States",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "US state" },
    { partOfSpeech: "part-of-speech/noun", spelling: "US states" },
  ],
  createdAt: "2026-10-30T15:49:09.400Z",
  updatedAt: "2026-10-30T15:49:09.400Z",
} as const satisfies CommonLanguageTerm
