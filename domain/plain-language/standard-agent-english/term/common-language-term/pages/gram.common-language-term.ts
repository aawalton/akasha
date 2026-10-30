import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const gram = {
  id: "01a18daf-8e4e-7bf0-b1cd-0a1f198d8a25",
  type: "page-type/common-language-term",
  slug: "gram",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "gram" },
    { partOfSpeech: "part-of-speech/noun", spelling: "grams" },
  ],
  createdAt: "2026-10-30T16:40:55.117Z",
  updatedAt: "2026-10-30T16:40:55.117Z",
} as const satisfies CommonLanguageTerm
