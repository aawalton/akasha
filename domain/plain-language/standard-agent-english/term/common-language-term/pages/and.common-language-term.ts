import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const and = {
  id: "01a0c60f-6691-78c8-b0d1-5b9cdc5cfd52",
  type: "page-type/common-language-term",
  slug: "and",
  definition: "the conjunction joining two things into one whole",
  spellings: [{ partOfSpeech: "part-of-speech/conjunction", spelling: "and" }],
} as const satisfies CommonLanguageTerm
