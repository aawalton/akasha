import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const bottom = {
  id: "01a0d8e2-3cf7-78d5-80ba-9f0d2954db02",
  type: "page-type/common-language-term",
  slug: "bottom",
  definition: "the lowest part of something",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "bottom" }],
} as const satisfies CommonLanguageTerm
