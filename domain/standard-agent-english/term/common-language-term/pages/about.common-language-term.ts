import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const about = {
  id: "01a0c58f-ae2a-7b16-b601-712164d33028",
  type: "page-type/common-language-term",
  slug: "about",
  definition: "the preposition naming what a thing concerns",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "about" }],
} as const satisfies CommonLanguageTerm
