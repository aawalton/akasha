import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tree = {
  id: "01a0c627-002d-70fa-b0c2-acb6e0dfa0d3",
  type: "page-type/common-language-term",
  slug: "tree",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tree" },
    { partOfSpeech: "part-of-speech/noun", spelling: "trees" },
  ],
} as const satisfies CommonLanguageTerm
