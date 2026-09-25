import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const well = {
  id: "01a0d8f4-b0e7-7f2e-9b4f-e28beb574878",
  type: "page-type/common-language-term",
  slug: "well",
  definition: "in a good way",
  spellings: [{ partOfSpeech: "part-of-speech/manner-adverb", spelling: "well" }],
} as const satisfies CommonLanguageTerm
