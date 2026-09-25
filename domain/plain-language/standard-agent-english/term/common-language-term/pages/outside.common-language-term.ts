import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const outside = {
  id: "01a0d984-ae97-7c1c-9b0d-12496b930b33",
  type: "page-type/common-language-term",
  slug: "outside",
  definition: "not within",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "outside" }],
} as const satisfies CommonLanguageTerm
