import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermThrow = {
  id: "01a18dbe-f32a-7700-92a3-2ffcf79b2e42",
  type: "page-type/common-language-term",
  slug: "common-language-term-throw",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "throw" },
    { partOfSpeech: "part-of-speech/verb", spelling: "throws" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "thrown" },
  ],
  createdAt: "2026-10-30T16:57:43.976Z",
  updatedAt: "2026-10-30T16:57:43.976Z",
} as const satisfies CommonLanguageTerm
