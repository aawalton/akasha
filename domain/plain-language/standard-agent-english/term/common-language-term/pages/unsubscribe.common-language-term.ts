import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const unsubscribe = {
  id: "01a18d65-ad21-7f8f-ab9d-35aad3893a5c",
  type: "page-type/common-language-term",
  slug: "unsubscribe",
  definition: "to stop the email a list sends",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "unsubscribe" },
    { partOfSpeech: "part-of-speech/verb", spelling: "unsubscribes" },
    { partOfSpeech: "part-of-speech/noun", spelling: "unsubscribe" },
  ],
  createdAt: "2026-10-30T15:20:13.344Z",
  updatedAt: "2026-10-30T15:20:13.344Z",
} as const satisfies CommonLanguageTerm
