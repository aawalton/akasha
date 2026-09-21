import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const length = {
  id: "01a0c624-e860-7630-970b-b72a3f72a7ec",
  type: "page-type/common-language-term",
  slug: "length",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "length" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lengths" },
  ],
} as const satisfies CommonLanguageTerm
