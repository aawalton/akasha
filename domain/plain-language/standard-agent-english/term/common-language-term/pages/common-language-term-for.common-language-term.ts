import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermFor = {
  id: "01a0c58f-1cdc-7643-9037-c37b3a50931e",
  type: "page-type/common-language-term",
  slug: "common-language-term-for",
  definition: "the preposition naming who or what a thing is meant to serve",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "for" }],
} as const satisfies CommonLanguageTerm
