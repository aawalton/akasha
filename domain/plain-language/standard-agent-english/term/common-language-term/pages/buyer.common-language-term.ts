import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const buyer = {
  id: "01a18d4b-988a-74d0-aa19-6a6143f6a05b",
  type: "page-type/common-language-term",
  slug: "buyer",
  definition: "a person who buys a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "buyer" },
    { partOfSpeech: "part-of-speech/noun", spelling: "buyers" },
  ],
  createdAt: "2026-10-30T14:51:44.137Z",
  updatedAt: "2026-10-30T14:51:44.137Z",
} as const satisfies CommonLanguageTerm
