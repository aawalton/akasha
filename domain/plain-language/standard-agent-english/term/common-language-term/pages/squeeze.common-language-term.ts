import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const squeeze = {
  id: "01a18dc2-6306-7ad7-a81b-ae148c315cf8",
  type: "page-type/common-language-term",
  slug: "squeeze",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "squeeze" },
    { partOfSpeech: "part-of-speech/verb", spelling: "squeezes" },
  ],
  createdAt: "2026-10-30T17:01:29.221Z",
  updatedAt: "2026-10-30T17:01:29.221Z",
} as const satisfies CommonLanguageTerm
