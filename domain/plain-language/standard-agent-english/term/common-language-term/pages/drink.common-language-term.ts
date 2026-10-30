import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const drink = {
  id: "01a18dd2-f2aa-755d-b800-c1661197a40f",
  type: "page-type/common-language-term",
  slug: "drink",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "drink" },
    { partOfSpeech: "part-of-speech/noun", spelling: "drinks" },
  ],
  createdAt: "2026-10-30T17:19:34.569Z",
  updatedAt: "2026-10-30T17:19:34.569Z",
} as const satisfies CommonLanguageTerm
