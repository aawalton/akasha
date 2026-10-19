import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const subscription = {
  id: "01a1557b-11ab-7053-aead-a7364d14e50f",
  type: "page-type/common-language-term",
  slug: "subscription",
  definition: "a service someone pays for again and again",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "subscription" },
    { partOfSpeech: "part-of-speech/noun", spelling: "subscriptions" },
  ],
  createdAt: "2026-10-19T18:44:51.242Z",
  updatedAt: "2026-10-19T18:44:51.242Z",
} as const satisfies CommonLanguageTerm
