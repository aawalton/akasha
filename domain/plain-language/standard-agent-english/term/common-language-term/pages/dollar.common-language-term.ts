import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const dollar = {
  id: "01a18d53-d573-7837-9d24-a1079a3bbdfd",
  type: "page-type/common-language-term",
  slug: "dollar",
  definition: "the money of the United States",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "dollar" },
    { partOfSpeech: "part-of-speech/noun", spelling: "dollars" },
  ],
  createdAt: "2026-10-30T15:00:44.018Z",
  updatedAt: "2026-10-30T15:00:44.018Z",
} as const satisfies CommonLanguageTerm
