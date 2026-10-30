import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const burn = {
  id: "01a18daf-31c5-7c2d-a942-6dc4fea0c94f",
  type: "page-type/common-language-term",
  slug: "burn",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "burn" },
    { partOfSpeech: "part-of-speech/verb", spelling: "burns" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "burned" },
  ],
  createdAt: "2026-10-30T16:40:31.428Z",
  updatedAt: "2026-10-30T16:40:31.428Z",
} as const satisfies CommonLanguageTerm
