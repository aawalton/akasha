import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const audible = {
  id: "01a18d7f-1007-747f-9f07-d9f50adbbc2d",
  type: "page-type/common-language-term",
  slug: "audible",
  definition: "the Amazon shop that sells books read aloud",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Audible" }],
  createdAt: "2026-10-30T15:47:57.062Z",
  updatedAt: "2026-10-30T15:47:57.062Z",
} as const satisfies CommonLanguageTerm
