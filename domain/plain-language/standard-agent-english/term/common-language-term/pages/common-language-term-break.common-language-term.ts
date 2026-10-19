import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermBreak = {
  id: "01a1554e-77ec-761b-9ad1-44ab01359b3f",
  type: "page-type/common-language-term",
  slug: "common-language-term-break",
  definition: "going against what a rule says",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "break" },
    { partOfSpeech: "part-of-speech/verb", spelling: "breaks" },
  ],
  createdAt: "2026-10-19T17:56:08.298Z",
  updatedAt: "2026-10-19T17:56:08.298Z",
} as const satisfies CommonLanguageTerm
