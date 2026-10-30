import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const meal = {
  id: "01a18daf-ea24-7806-91af-0a413f307d1b",
  type: "page-type/common-language-term",
  slug: "meal",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "meal" },
    { partOfSpeech: "part-of-speech/noun", spelling: "meals" },
  ],
  createdAt: "2026-10-30T16:41:18.626Z",
  updatedAt: "2026-10-30T16:41:18.626Z",
} as const satisfies CommonLanguageTerm
