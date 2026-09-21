import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const shrine = {
  id: "01a0c602-6f92-7d9a-bb91-20d3b5d73bc6",
  type: "page-type/common-language-term",
  slug: "shrine",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "shrine" },
    { partOfSpeech: "part-of-speech/noun", spelling: "shrines" },
  ],
} as const satisfies CommonLanguageTerm
