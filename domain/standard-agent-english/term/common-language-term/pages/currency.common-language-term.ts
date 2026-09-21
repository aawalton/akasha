import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const currency = {
  id: "01a0c62d-b2af-7757-8253-9a9e152d64cc",
  type: "page-type/common-language-term",
  slug: "currency",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "currency" },
    { partOfSpeech: "part-of-speech/noun", spelling: "currencies" },
  ],
} as const satisfies CommonLanguageTerm
