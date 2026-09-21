import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const treasure = {
  id: "01a0c622-6746-7e38-8b5c-d3d994745d50",
  type: "page-type/common-language-term",
  slug: "treasure",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "treasure" }],
} as const satisfies CommonLanguageTerm
