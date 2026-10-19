import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const call = {
  id: "01a0ca58-2fe6-7121-980d-7e028620e416",
  type: "page-type/common-language-term",
  slug: "call",
  definition: "putting a request to a program and taking its answer, as a session does to a model",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "call" },
    { partOfSpeech: "part-of-speech/verb", spelling: "calls" },
    { partOfSpeech: "part-of-speech/noun", spelling: "call" },
    { partOfSpeech: "part-of-speech/noun", spelling: "calls" },
  ],
  createdAt: "2026-09-22T18:19:32.198Z",
  updatedAt: "2026-10-19T18:49:28.009Z",
} as const satisfies CommonLanguageTerm
