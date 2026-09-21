import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sight = {
  id: "01a0c602-82b3-7afe-a3e7-5434699af4e0",
  type: "page-type/common-language-term",
  slug: "sight",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "sight" }],
} as const satisfies CommonLanguageTerm
