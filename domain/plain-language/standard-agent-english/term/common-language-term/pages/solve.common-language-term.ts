import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const solve = {
  id: "01a18d4a-cb8e-79cc-8526-1a6cbbe94d50",
  type: "page-type/common-language-term",
  slug: "solve",
  definition: "find the answer to a problem",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "solve" },
    { partOfSpeech: "part-of-speech/verb", spelling: "solves" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "solved" },
  ],
  createdAt: "2026-10-30T14:50:51.661Z",
  updatedAt: "2026-10-30T14:50:51.661Z",
} as const satisfies CommonLanguageTerm
