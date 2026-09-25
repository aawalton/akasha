import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const over = {
  id: "01a0c58f-9c6a-7e9c-9d6b-ea0a3db59480",
  type: "page-type/common-language-term",
  slug: "over",
  definition: "the preposition naming what a thing is above",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "over" }],
} as const satisfies CommonLanguageTerm
