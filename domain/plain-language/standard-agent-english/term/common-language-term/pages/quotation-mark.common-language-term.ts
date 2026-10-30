import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const quotationMark = {
  id: "01a18dcb-97f5-7d31-aa49-7ad494be30ce",
  type: "page-type/common-language-term",
  slug: "quotation-mark",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "quotation mark" },
    { partOfSpeech: "part-of-speech/noun", spelling: "quotation marks" },
  ],
  createdAt: "2026-10-30T17:11:32.596Z",
  updatedAt: "2026-10-30T17:11:32.596Z",
} as const satisfies CommonLanguageTerm
