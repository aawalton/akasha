import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const asia = {
  id: "01a0d48b-634a-760b-8c19-190e58e5f3e5",
  type: "page-type/common-language-term",
  slug: "asia",
  definition: "the largest continent",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Asia" }],
  createdAt: "2026-09-24T17:51:39.850Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
