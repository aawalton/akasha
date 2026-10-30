import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const maker = {
  id: "01a18d53-9ab2-7ba5-8792-f3688be493d3",
  type: "page-type/common-language-term",
  slug: "maker",
  definition: "the company that builds a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "maker" },
    { partOfSpeech: "part-of-speech/noun", spelling: "makers" },
  ],
  createdAt: "2026-10-30T15:00:28.978Z",
  updatedAt: "2026-10-30T15:00:28.978Z",
} as const satisfies CommonLanguageTerm
