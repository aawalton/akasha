import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const short = {
  id: "01a0d902-1008-78ec-8cf1-5f7460e56b0a",
  type: "page-type/common-language-term",
  slug: "short",
  definition: "not long",
  spellings: [
    { partOfSpeech: "part-of-speech/adjective", spelling: "short" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "shorter" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "shortest" },
  ],
  createdAt: "2026-09-25T14:39:46.184Z",
  updatedAt: "2026-10-30T17:41:13.648Z",
} as const satisfies CommonLanguageTerm
