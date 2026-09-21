import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const end = {
  id: "01a0c624-516d-7d67-8804-6324fb028fca",
  type: "page-type/common-language-term",
  slug: "end",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "end" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ends" },
  ],
} as const satisfies CommonLanguageTerm
