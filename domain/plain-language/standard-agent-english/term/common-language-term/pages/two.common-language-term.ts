import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const two = {
  id: "01a155a9-0040-719d-840a-a4c59c82ebb6",
  type: "page-type/common-language-term",
  slug: "two",
  definition: "one more than one",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "two" }],
  createdAt: "2026-10-19T19:35:01.439Z",
  updatedAt: "2026-10-19T19:35:01.439Z",
} as const satisfies CommonLanguageTerm
