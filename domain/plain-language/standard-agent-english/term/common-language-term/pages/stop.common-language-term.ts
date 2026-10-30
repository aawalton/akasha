import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stop = {
  id: "01a0d3ee-4609-79c9-8be8-f3c77f483337",
  type: "page-type/common-language-term",
  slug: "stop",
  definition: "a thing ceasing to go",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "stop" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stops" },
    { partOfSpeech: "part-of-speech/verb", spelling: "stop" },
    { partOfSpeech: "part-of-speech/verb", spelling: "stops" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "stopping" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "stopped" },
  ],
  createdAt: "2026-09-24T15:00:03.209Z",
  updatedAt: "2026-10-30T15:32:31.491Z",
} as const satisfies CommonLanguageTerm
