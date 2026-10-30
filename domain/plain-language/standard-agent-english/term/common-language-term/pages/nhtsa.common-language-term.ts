import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const nhtsa = {
  id: "01a18d75-f01e-7f5b-a0bc-6c8557d06ca1",
  type: "page-type/common-language-term",
  slug: "nhtsa",
  definition: "the agency of the United States government that keeps traffic on its highways safe",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "NHTSA" }],
  createdAt: "2026-10-30T15:37:59.069Z",
  updatedAt: "2026-10-30T15:37:59.069Z",
} as const satisfies CommonLanguageTerm
