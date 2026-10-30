import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const care = {
  id: "01a0d8ad-9ff9-77f5-b205-0d07b5e153d7",
  type: "page-type/common-language-term",
  slug: "care",
  definition: "to look after someone",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "care" },
    { partOfSpeech: "part-of-speech/verb", spelling: "cares" },
    { partOfSpeech: "part-of-speech/noun", spelling: "care" },
  ],
  createdAt: "2026-09-25T13:07:32.473Z",
  updatedAt: "2026-10-30T16:56:10.091Z",
} as const satisfies CommonLanguageTerm
