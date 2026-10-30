import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const bank = {
  id: "01a18d88-d052-7769-8843-c5c4ca81cdf0",
  type: "page-type/common-language-term",
  slug: "bank",
  definition: "a company that holds money for people",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "bank" },
    { partOfSpeech: "part-of-speech/noun", spelling: "banks" },
  ],
  createdAt: "2026-10-30T15:58:36.112Z",
  updatedAt: "2026-10-30T15:58:36.112Z",
} as const satisfies CommonLanguageTerm
