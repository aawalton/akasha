import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const longTerm = {
  id: "01a0d88e-63a0-706c-b888-d61f24f96bf0",
  type: "page-type/common-language-term",
  slug: "long-term",
  definition: "over many years",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "long-term" }],
} as const satisfies CommonLanguageTerm
