import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const match = {
  id: "01a0d5ca-0853-7425-b64b-253b71b8bf0c",
  type: "page-type/common-language-term",
  slug: "match",
  definition: "to fit what is asked for",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "match" },
    { partOfSpeech: "part-of-speech/verb", spelling: "matches" },
  ],
  createdAt: "2026-09-24T23:39:42.547Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
