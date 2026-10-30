import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const week = {
  id: "01a18db3-6b90-7736-8a2e-eb95e800a330",
  type: "page-type/common-language-term",
  slug: "week",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "week" },
    { partOfSpeech: "part-of-speech/noun", spelling: "weeks" },
  ],
  createdAt: "2026-10-30T16:45:08.367Z",
  updatedAt: "2026-10-30T16:45:08.367Z",
} as const satisfies CommonLanguageTerm
