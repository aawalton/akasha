import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const year = {
  id: "01a0c627-5828-7287-9a5f-a818ef1a4970",
  type: "page-type/common-language-term",
  slug: "year",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "year" },
    { partOfSpeech: "part-of-speech/noun", spelling: "years" },
  ],
} as const satisfies CommonLanguageTerm
