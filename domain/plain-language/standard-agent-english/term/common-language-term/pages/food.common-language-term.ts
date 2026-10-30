import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const food = {
  id: "01a18dd2-7536-7017-8ba0-bacbf04830aa",
  type: "page-type/common-language-term",
  slug: "food",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "food" },
    { partOfSpeech: "part-of-speech/noun", spelling: "foods" },
  ],
  createdAt: "2026-10-30T17:19:02.452Z",
  updatedAt: "2026-10-30T17:19:02.452Z",
} as const satisfies CommonLanguageTerm
