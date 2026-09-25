import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const short = {
  id: "01a0d902-1008-78ec-8cf1-5f7460e56b0a",
  type: "page-type/common-language-term",
  slug: "short",
  definition: "not long",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "short" }],
} as const satisfies CommonLanguageTerm
