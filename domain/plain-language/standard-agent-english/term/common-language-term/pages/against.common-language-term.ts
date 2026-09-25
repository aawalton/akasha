import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const against = {
  id: "01a0c58f-f989-7753-901d-c21d17803498",
  type: "page-type/common-language-term",
  slug: "against",
  definition: "the preposition naming what a thing presses on",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "against" }],
} as const satisfies CommonLanguageTerm
