import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const between = {
  id: "01a0c590-0c6e-74d3-9d84-418efa733455",
  type: "page-type/common-language-term",
  slug: "between",
  definition: "the preposition naming the two things a thing is in the middle of",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "between" }],
} as const satisfies CommonLanguageTerm
