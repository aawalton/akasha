import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const random = {
  id: "01a18d41-874f-7f4a-b5ba-27b5cdf95a48",
  type: "page-type/common-language-term",
  slug: "random",
  definition: "chosen by chance",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "random" }],
  createdAt: "2026-10-30T14:40:44.366Z",
  updatedAt: "2026-10-30T14:40:44.366Z",
} as const satisfies CommonLanguageTerm
