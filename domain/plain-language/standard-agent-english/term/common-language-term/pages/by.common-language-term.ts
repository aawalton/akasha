import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const by = {
  id: "01a0c58f-77cd-71de-abf7-ab5c3fc23e62",
  type: "page-type/common-language-term",
  slug: "by",
  definition: "the preposition naming who or what does a thing",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "by" }],
} as const satisfies CommonLanguageTerm
