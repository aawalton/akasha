import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const piece = {
  id: "01a0c626-49ae-7191-92c5-dcc78ea5e7bd",
  type: "page-type/common-language-term",
  slug: "piece",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "piece" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pieces" },
  ],
} as const satisfies CommonLanguageTerm
