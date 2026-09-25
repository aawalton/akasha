import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const into = {
  id: "01a0c58f-8a97-71a6-8836-bacc4d55c063",
  type: "page-type/common-language-term",
  slug: "into",
  definition: "the preposition naming what a thing moves inside",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "into" }],
} as const satisfies CommonLanguageTerm
