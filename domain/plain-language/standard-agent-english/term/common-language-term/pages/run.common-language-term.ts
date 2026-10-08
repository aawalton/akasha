import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const run = {
  id: "01a0c937-9efa-79dc-ab59-21f33ba7362a",
  type: "page-type/common-language-term",
  slug: "run",
  definition: "a program taken from beginning to end, and the taking of a program that way",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "run" },
    { partOfSpeech: "part-of-speech/verb", spelling: "runs" },
    { partOfSpeech: "part-of-speech/noun", spelling: "run" },
    { partOfSpeech: "part-of-speech/noun", spelling: "runs" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "run" },
  ],
  createdAt: "2026-09-22T13:04:20.730Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
