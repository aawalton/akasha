import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const life = {
  id: "01a0d47f-d333-7180-93d1-0645e1ddfa4b",
  type: "page-type/common-language-term",
  slug: "life",
  definition: "the time from a thing's start to its end, and what fills that time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "life" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lives" },
  ],
} as const satisfies CommonLanguageTerm
