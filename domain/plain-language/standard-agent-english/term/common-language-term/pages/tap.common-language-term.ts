import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tap = {
  id: "01a18d86-9eed-7112-a1dd-0c342c5cf667",
  type: "page-type/common-language-term",
  slug: "tap",
  definition: "a quick touch of a finger on a screen",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tap" },
    { partOfSpeech: "part-of-speech/noun", spelling: "taps" },
    { partOfSpeech: "part-of-speech/verb", spelling: "tap" },
    { partOfSpeech: "part-of-speech/verb", spelling: "taps" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "tapped" },
  ],
  createdAt: "2026-10-30T15:56:12.396Z",
  updatedAt: "2026-10-30T15:56:12.396Z",
} as const satisfies CommonLanguageTerm
