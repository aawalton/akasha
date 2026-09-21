import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const entry = {
  id: "01a0c624-4000-7710-87bb-9ceaf153f4e5",
  type: "page-type/common-language-term",
  slug: "entry",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "entry" },
    { partOfSpeech: "part-of-speech/noun", spelling: "entries" },
  ],
} as const satisfies CommonLanguageTerm
