import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const pass = {
  id: "01a155a4-7cc1-776e-962a-8afb2314fca4",
  type: "page-type/common-language-term",
  slug: "pass",
  definition: "letting something through",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pass" },
    { partOfSpeech: "part-of-speech/noun", spelling: "passes" },
  ],
  createdAt: "2026-10-19T19:30:05.632Z",
  updatedAt: "2026-10-19T19:30:05.632Z",
} as const satisfies CommonLanguageTerm
