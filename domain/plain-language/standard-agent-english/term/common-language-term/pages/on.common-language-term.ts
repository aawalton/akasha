import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const on = {
  id: "01a0c58f-5515-75cb-87cc-cbdb85ce40c0",
  type: "page-type/common-language-term",
  slug: "on",
  definition: "the preposition naming what a thing rests against",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "on" }],
} as const satisfies CommonLanguageTerm
