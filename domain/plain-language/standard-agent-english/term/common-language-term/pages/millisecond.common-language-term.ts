import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const millisecond = {
  id: "01a18d58-511b-7f12-8707-d6355f36b677",
  type: "page-type/common-language-term",
  slug: "millisecond",
  definition: "a part of a minute",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "millisecond" },
    { partOfSpeech: "part-of-speech/noun", spelling: "milliseconds" },
  ],
  createdAt: "2026-10-30T15:05:37.818Z",
  updatedAt: "2026-10-30T15:05:37.818Z",
} as const satisfies CommonLanguageTerm
