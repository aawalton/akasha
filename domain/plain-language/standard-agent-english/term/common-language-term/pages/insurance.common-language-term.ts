import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const insurance = {
  id: "01a18d60-c950-7cc2-92f4-001978c3f2d5",
  type: "page-type/common-language-term",
  slug: "insurance",
  definition: "a promise to pay for a loss in return for regular payments",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "insurance" }],
  createdAt: "2026-10-30T15:14:52.879Z",
  updatedAt: "2026-10-30T15:14:52.879Z",
} as const satisfies CommonLanguageTerm
