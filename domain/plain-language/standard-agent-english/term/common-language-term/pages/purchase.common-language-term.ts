import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const purchase = {
  id: "01a18d77-4c09-700f-b1fc-673e98c4941e",
  type: "page-type/common-language-term",
  slug: "purchase",
  definition: "a thing a person buys",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "purchase" },
    { partOfSpeech: "part-of-speech/noun", spelling: "purchases" },
  ],
  createdAt: "2026-10-30T15:39:28.133Z",
  updatedAt: "2026-10-30T15:39:28.133Z",
} as const satisfies CommonLanguageTerm
