import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const alliance = {
  id: "01a0c600-27a5-714f-a589-d3dbbf06572f",
  type: "page-type/common-language-term",
  slug: "alliance",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "alliance" }],
} as const satisfies CommonLanguageTerm
