import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const current = {
  id: "01a0d41c-1b12-736a-baed-12f2361fcc74",
  type: "page-type/common-language-term",
  slug: "current",
  definition: "the one in effect now, with nothing newer",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "current" }],
  createdAt: "2026-09-24T15:50:06.866Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
