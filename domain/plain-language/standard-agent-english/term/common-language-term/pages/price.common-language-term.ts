import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const price = {
  id: "01a18d46-4dd2-710c-b2c8-9aca46321875",
  type: "page-type/common-language-term",
  slug: "price",
  definition: "the money asked for a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "price" },
    { partOfSpeech: "part-of-speech/noun", spelling: "prices" },
  ],
  createdAt: "2026-10-30T14:45:57.329Z",
  updatedAt: "2026-10-30T14:45:57.329Z",
} as const satisfies CommonLanguageTerm
