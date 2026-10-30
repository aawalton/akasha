import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const wait = {
  id: "01a0d5b8-6729-72c1-828b-c0f2275caf1a",
  type: "page-type/common-language-term",
  slug: "wait",
  definition: "to stay until something happens",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "wait" },
    { partOfSpeech: "part-of-speech/verb", spelling: "waits" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "waiting" },
  ],
  createdAt: "2026-09-24T23:20:27.177Z",
  updatedAt: "2026-10-30T14:57:37.615Z",
} as const satisfies CommonLanguageTerm
