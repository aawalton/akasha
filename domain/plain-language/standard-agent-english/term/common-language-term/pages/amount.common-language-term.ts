import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const amount = {
  id: "01a18d76-9568-73ed-b53e-8ff2c00f159b",
  type: "page-type/common-language-term",
  slug: "amount",
  definition: "the size of a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "amount" },
    { partOfSpeech: "part-of-speech/noun", spelling: "amounts" },
  ],
  createdAt: "2026-10-30T15:38:41.383Z",
  updatedAt: "2026-10-30T15:38:41.383Z",
} as const satisfies CommonLanguageTerm
