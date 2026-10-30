import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const muscle = {
  id: "01a18db7-779e-7708-9339-0c90ba343753",
  type: "page-type/common-language-term",
  slug: "muscle",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "muscle" },
    { partOfSpeech: "part-of-speech/noun", spelling: "muscles" },
  ],
  createdAt: "2026-10-30T16:49:33.596Z",
  updatedAt: "2026-10-30T16:49:33.596Z",
} as const satisfies CommonLanguageTerm
