import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const have = {
  id: "01a0c67d-e4e6-7953-9bbb-e2115630ce11",
  type: "page-type/common-language-term",
  slug: "have",
  definition: "the verb saying what a thing is made up of or marked by",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "have" },
    { partOfSpeech: "part-of-speech/verb", spelling: "has" },
    { partOfSpeech: "part-of-speech/have-verb", spelling: "have" },
    { partOfSpeech: "part-of-speech/have-verb", spelling: "has" },
  ],
  createdAt: "2026-09-22T00:22:14.502Z",
  updatedAt: "2026-10-30T15:31:53.748Z",
} as const satisfies CommonLanguageTerm
