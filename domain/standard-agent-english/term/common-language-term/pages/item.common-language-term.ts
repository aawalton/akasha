import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const item = {
  id: "01a0c624-2dfc-7ff9-9e9f-1ff543ce4d8f",
  type: "page-type/common-language-term",
  slug: "item",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "item" },
    { partOfSpeech: "part-of-speech/noun", spelling: "items" },
  ],
} as const satisfies CommonLanguageTerm
