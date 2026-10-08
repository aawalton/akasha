import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const safe = {
  id: "01a0d5cb-d8df-7f54-a009-648241e333ac",
  type: "page-type/common-language-term",
  slug: "safe",
  definition: "out of danger",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "safe" }],
  createdAt: "2026-09-24T23:41:41.471Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
