import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const can = {
  id: "01a0ca71-309e-7384-aea0-32f910391ef5",
  type: "page-type/common-language-term",
  slug: "can",
  definition: "the modal saying an act is possible",
  spellings: [{ partOfSpeech: "part-of-speech/modal", spelling: "can" }],
} as const satisfies CommonLanguageTerm
