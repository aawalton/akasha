import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const metre = {
  id: "01a18dae-e3aa-7ba3-b186-df77c28a7548",
  type: "page-type/common-language-term",
  slug: "metre",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "metre" },
    { partOfSpeech: "part-of-speech/noun", spelling: "metres" },
  ],
  createdAt: "2026-10-30T16:40:11.432Z",
  updatedAt: "2026-10-30T16:40:11.432Z",
} as const satisfies CommonLanguageTerm
