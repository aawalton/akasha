import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const become = {
  id: "01a0d8b0-a07e-75f4-908f-7e5ca62dcc1a",
  type: "page-type/common-language-term",
  slug: "become",
  definition: "to come to be",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "become" },
    { partOfSpeech: "part-of-speech/verb", spelling: "becomes" },
  ],
  createdAt: "2026-09-25T13:10:49.214Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
