import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const instant = {
  id: "01a18d8d-307d-75c1-9bde-458fbc124725",
  type: "page-type/common-language-term",
  slug: "instant",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "instant" },
    { partOfSpeech: "part-of-speech/noun", spelling: "instants" },
  ],
  createdAt: "2026-10-30T16:03:22.876Z",
  updatedAt: "2026-10-30T16:03:22.876Z",
} as const satisfies CommonLanguageTerm
