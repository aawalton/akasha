import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const subtract = {
  id: "01a18dbc-3e91-7cb8-befc-d76892a6191a",
  type: "page-type/common-language-term",
  slug: "subtract",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "subtract" },
    { partOfSpeech: "part-of-speech/verb", spelling: "subtracts" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "subtracted" },
  ],
  createdAt: "2026-10-30T16:54:46.672Z",
  updatedAt: "2026-10-30T16:54:46.672Z",
} as const satisfies CommonLanguageTerm
