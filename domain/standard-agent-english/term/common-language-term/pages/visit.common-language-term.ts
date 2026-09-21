import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const visit = {
  id: "01a0c62c-f875-7a23-bb52-8c64cdee6f9b",
  type: "page-type/common-language-term",
  slug: "visit",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "visit" },
    { partOfSpeech: "part-of-speech/noun", spelling: "visits" },
  ],
} as const satisfies CommonLanguageTerm
