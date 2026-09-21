import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const shelf = {
  id: "01a0c602-5bc6-72b1-83f3-eeeaa4a9ca9a",
  type: "page-type/common-language-term",
  slug: "shelf",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "shelf" }],
} as const satisfies CommonLanguageTerm
