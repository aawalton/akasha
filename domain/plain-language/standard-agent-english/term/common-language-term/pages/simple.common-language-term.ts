import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const simple = {
  id: "01a0d90e-743e-72ce-87c8-6dcc427f442f",
  type: "page-type/common-language-term",
  slug: "simple",
  definition: "made of few things",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "simple" }],
  createdAt: "2026-09-25T14:53:18.270Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
