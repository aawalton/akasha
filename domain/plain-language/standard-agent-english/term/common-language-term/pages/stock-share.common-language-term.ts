import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stockShare = {
  id: "01a18d87-0d0b-74e7-8d2b-bf9f816c2923",
  type: "page-type/common-language-term",
  slug: "stock-share",
  definition: "a unit of an investment",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "stock share" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stock shares" },
  ],
  createdAt: "2026-10-30T15:56:40.586Z",
  updatedAt: "2026-10-30T15:56:40.586Z",
} as const satisfies CommonLanguageTerm
