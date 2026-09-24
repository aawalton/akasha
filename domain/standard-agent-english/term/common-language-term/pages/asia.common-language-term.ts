import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const asia = {
  id: "01a0d48b-634a-760b-8c19-190e58e5f3e5",
  type: "page-type/common-language-term",
  slug: "asia",
  definition: "the largest continent",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Asia" }],
} as const satisfies CommonLanguageTerm
