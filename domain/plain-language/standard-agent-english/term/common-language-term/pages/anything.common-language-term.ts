import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const anything = {
  id: "01a18d41-5a62-75b8-8ec9-db63d5c5c750",
  type: "page-type/common-language-term",
  slug: "anything",
  definition: "a thing of any kind",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "anything" }],
  createdAt: "2026-10-30T14:40:32.863Z",
  updatedAt: "2026-10-30T14:40:32.863Z",
} as const satisfies CommonLanguageTerm
