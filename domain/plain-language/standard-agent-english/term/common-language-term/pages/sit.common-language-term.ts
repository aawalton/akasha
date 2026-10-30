import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sit = {
  id: "01a18d47-e127-7120-8909-f45683d2b36a",
  type: "page-type/common-language-term",
  slug: "sit",
  definition: "to rest in a place",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "sit" },
    { partOfSpeech: "part-of-speech/verb", spelling: "sits" },
  ],
  createdAt: "2026-10-30T14:47:40.582Z",
  updatedAt: "2026-10-30T14:47:40.582Z",
} as const satisfies CommonLanguageTerm
