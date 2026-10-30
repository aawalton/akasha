import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const claim = {
  id: "01a18db7-95c0-70ca-bd0b-c4a0f38961f1",
  type: "page-type/common-language-term",
  slug: "claim",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "claim" },
    { partOfSpeech: "part-of-speech/noun", spelling: "claims" },
  ],
  createdAt: "2026-10-30T16:49:41.311Z",
  updatedAt: "2026-10-30T16:49:41.311Z",
} as const satisfies CommonLanguageTerm
