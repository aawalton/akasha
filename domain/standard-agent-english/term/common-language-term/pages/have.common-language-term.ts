import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const have = {
  id: "01a0c67d-e4e6-7953-9bbb-e2115630ce11",
  type: "page-type/common-language-term",
  slug: "have",
  definition: "the verb saying what a thing is made up of or marked by",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "have" },
    { partOfSpeech: "part-of-speech/verb", spelling: "has" },
  ],
} as const satisfies CommonLanguageTerm
