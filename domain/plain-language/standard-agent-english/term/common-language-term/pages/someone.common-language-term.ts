import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const someone = {
  id: "01a0caaf-8ea5-79fe-bc2a-cf106d3ecec1",
  type: "page-type/common-language-term",
  slug: "someone",
  definition: "a person the writer does not name",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "someone" }],
  createdAt: "2026-09-22T19:54:58.085Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
