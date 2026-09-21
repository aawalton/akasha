import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const family = {
  id: "01a0c600-ab51-79b1-a8f0-233fa86883b8",
  type: "page-type/common-language-term",
  slug: "family",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "family" }],
} as const satisfies CommonLanguageTerm
