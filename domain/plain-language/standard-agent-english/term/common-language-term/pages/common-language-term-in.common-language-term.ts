import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermIn = {
  id: "01a0c58f-0a81-7f44-9cdb-a45c6807aca6",
  type: "page-type/common-language-term",
  slug: "common-language-term-in",
  definition: "the preposition naming what a thing is inside",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "in" }],
} as const satisfies CommonLanguageTerm
