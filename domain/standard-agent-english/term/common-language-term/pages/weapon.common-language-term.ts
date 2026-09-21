import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const weapon = {
  id: "01a0c603-26bd-7cc9-b06e-4674329ca429",
  type: "page-type/common-language-term",
  slug: "weapon",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "weapon" }],
} as const satisfies CommonLanguageTerm
