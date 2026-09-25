import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const of = {
  id: "01a0c58f-4261-7b0f-9aa9-aaab3abde0d2",
  type: "page-type/common-language-term",
  slug: "of",
  definition: "the preposition naming what a thing belongs to",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "of" }],
} as const satisfies CommonLanguageTerm
