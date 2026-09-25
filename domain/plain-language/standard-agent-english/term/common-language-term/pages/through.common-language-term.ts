import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const through = {
  id: "01a0c58f-c08b-7183-8cc7-4879dcec525d",
  type: "page-type/common-language-term",
  slug: "through",
  definition: "the preposition naming what a thing goes inside and out of",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "through" }],
} as const satisfies CommonLanguageTerm
