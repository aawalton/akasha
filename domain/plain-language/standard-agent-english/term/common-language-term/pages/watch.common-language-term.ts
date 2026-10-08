import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const watch = {
  id: "01a0d8ac-c690-7d5d-a34d-344b1989dc1e",
  type: "page-type/common-language-term",
  slug: "watch",
  definition: "to look at something as it goes on",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "watch" },
    { partOfSpeech: "part-of-speech/verb", spelling: "watches" },
  ],
  createdAt: "2026-09-25T13:06:36.816Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
