import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const jewelry = {
  id: "01a0c627-a037-76a4-8f7d-dbb3a5ab86a2",
  type: "page-type/common-language-term",
  slug: "jewelry",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "jewelry" }],
} as const satisfies CommonLanguageTerm
