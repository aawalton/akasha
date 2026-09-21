import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const chest = {
  id: "01a0c622-7abb-75b1-b7e5-02a2e980c70f",
  type: "page-type/common-language-term",
  slug: "chest",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "chest" },
    { partOfSpeech: "part-of-speech/noun", spelling: "chests" },
  ],
} as const satisfies CommonLanguageTerm
