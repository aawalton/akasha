import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const healthyLifeExpectancy = {
  id: "01a18d9b-dd1d-79ac-a4f7-a6a5ef9a0523",
  type: "page-type/common-language-term",
  slug: "healthy-life-expectancy",
  definition: "the years of full health a person can expect",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "healthy life expectancy" }],
  createdAt: "2026-10-30T16:19:24.571Z",
  updatedAt: "2026-10-30T16:19:24.571Z",
} as const satisfies CommonLanguageTerm
