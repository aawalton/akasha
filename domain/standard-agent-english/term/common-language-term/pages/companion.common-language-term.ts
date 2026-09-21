import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const companion = {
  id: "01a0c623-d09f-7738-8f8d-d569ad75b086",
  type: "page-type/common-language-term",
  slug: "companion",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "companion" },
    { partOfSpeech: "part-of-speech/noun", spelling: "companions" },
  ],
} as const satisfies CommonLanguageTerm
