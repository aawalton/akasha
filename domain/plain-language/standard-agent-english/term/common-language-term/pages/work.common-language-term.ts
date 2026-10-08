import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const work = {
  id: "01a0d3cb-f4ea-7db3-8754-9af2855c3a5e",
  type: "page-type/common-language-term",
  slug: "work",
  definition: "what somebody is doing or has to do",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "work" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "working" },
    { partOfSpeech: "part-of-speech/verb", spelling: "work" },
    { partOfSpeech: "part-of-speech/verb", spelling: "works" },
  ],
  createdAt: "2026-09-24T14:22:34.218Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
