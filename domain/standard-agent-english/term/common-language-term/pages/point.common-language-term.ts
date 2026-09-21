import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const point = {
  id: "01a0c624-64c2-7fcf-b166-ff9130c5d2a1",
  type: "page-type/common-language-term",
  slug: "point",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "point" },
    { partOfSpeech: "part-of-speech/noun", spelling: "points" },
  ],
} as const satisfies CommonLanguageTerm
