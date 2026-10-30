import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const death = {
  id: "01a18d8f-3830-7ed4-8070-b7808a91e29d",
  type: "page-type/common-language-term",
  slug: "death",
  definition: "the time a life ends",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "death" },
    { partOfSpeech: "part-of-speech/noun", spelling: "deaths" },
  ],
  createdAt: "2026-10-30T16:05:35.919Z",
  updatedAt: "2026-10-30T16:05:35.919Z",
} as const satisfies CommonLanguageTerm
