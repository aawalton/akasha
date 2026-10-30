import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const minute = {
  id: "01a18d42-91a6-71d1-a015-e3eafe107f67",
  type: "page-type/common-language-term",
  slug: "minute",
  definition: "a part of an hour",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "minute" },
    { partOfSpeech: "part-of-speech/noun", spelling: "minutes" },
  ],
  createdAt: "2026-10-30T14:41:52.548Z",
  updatedAt: "2026-10-30T14:41:52.548Z",
} as const satisfies CommonLanguageTerm
