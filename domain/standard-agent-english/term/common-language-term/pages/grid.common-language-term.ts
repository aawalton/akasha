import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const grid = {
  id: "01a0c629-c4c3-7fee-80ce-414a4ca55c2c",
  type: "page-type/common-language-term",
  slug: "grid",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "grid" },
    { partOfSpeech: "part-of-speech/noun", spelling: "grids" },
  ],
} as const satisfies CommonLanguageTerm
