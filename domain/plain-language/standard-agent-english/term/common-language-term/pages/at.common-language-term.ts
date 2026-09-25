import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const at = {
  id: "01a0c58f-d2c1-79d9-b91d-07dac393c5e5",
  type: "page-type/common-language-term",
  slug: "at",
  definition: "the preposition naming the place or the moment a thing is found",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "at" }],
} as const satisfies CommonLanguageTerm
