import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const category = {
  id: "01a0c624-d5d8-786e-aa45-56339725399e",
  type: "page-type/common-language-term",
  slug: "category",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "category" },
    { partOfSpeech: "part-of-speech/noun", spelling: "categories" },
  ],
} as const satisfies CommonLanguageTerm
