import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const payment = {
  id: "01a18dbe-fada-779a-abd2-ec59d1d4df21",
  type: "page-type/common-language-term",
  slug: "payment",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "payment" },
    { partOfSpeech: "part-of-speech/noun", spelling: "payments" },
  ],
  createdAt: "2026-10-30T16:57:45.945Z",
  updatedAt: "2026-10-30T16:57:45.945Z",
} as const satisfies CommonLanguageTerm
