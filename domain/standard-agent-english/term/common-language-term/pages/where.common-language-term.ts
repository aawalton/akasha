import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const where = {
  id: "01a0c9a4-ee3e-7fc2-9b12-8b2275a6a82d",
  type: "page-type/common-language-term",
  slug: "where",
  definition: "the pronoun naming the place a clause leaves out",
  spellings: [{ partOfSpeech: "part-of-speech/free-relative-pronoun", spelling: "where" }],
} as const satisfies CommonLanguageTerm
