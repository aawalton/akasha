import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const roll = {
  id: "01a18dc1-b73e-7fc5-a6ef-49776a217945",
  type: "page-type/common-language-term",
  slug: "roll",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "roll" },
    { partOfSpeech: "part-of-speech/verb", spelling: "rolls" },
  ],
  createdAt: "2026-10-30T17:00:45.245Z",
  updatedAt: "2026-10-30T17:00:45.245Z",
} as const satisfies CommonLanguageTerm
