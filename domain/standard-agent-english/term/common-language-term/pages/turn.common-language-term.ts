import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const turn = {
  id: "01a0c602-f05a-7c7e-aa21-64c4e6852a3c",
  type: "page-type/common-language-term",
  slug: "turn",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "turn" },
    { partOfSpeech: "part-of-speech/noun", spelling: "turns" },
  ],
} as const satisfies CommonLanguageTerm
