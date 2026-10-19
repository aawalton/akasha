import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const judge = {
  id: "01a15551-bb09-78b1-a7ac-c5c94022549f",
  type: "page-type/common-language-term",
  slug: "judge",
  definition: "deciding whether something passes",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "judge" },
    { partOfSpeech: "part-of-speech/verb", spelling: "judges" },
  ],
  createdAt: "2026-10-19T17:59:42.088Z",
  updatedAt: "2026-10-19T17:59:42.088Z",
} as const satisfies CommonLanguageTerm
