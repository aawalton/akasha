import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hear = {
  id: "01a18d98-03aa-7b00-ac3c-09a5c6af40aa",
  type: "page-type/common-language-term",
  slug: "hear",
  definition: "notice sound",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "hear" },
    { partOfSpeech: "part-of-speech/verb", spelling: "hears" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "heard" },
  ],
  createdAt: "2026-10-30T16:15:12.297Z",
  updatedAt: "2026-10-30T16:15:12.297Z",
} as const satisfies CommonLanguageTerm
