import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const reject = {
  id: "01a15595-83cb-7691-89ee-b0e503817cea",
  type: "page-type/common-language-term",
  slug: "reject",
  definition: "turning something down",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "reject" },
    { partOfSpeech: "part-of-speech/verb", spelling: "rejects" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "rejected" },
  ],
  createdAt: "2026-10-19T19:13:44.394Z",
  updatedAt: "2026-10-19T19:13:44.394Z",
} as const satisfies CommonLanguageTerm
