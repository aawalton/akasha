import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const day = {
  id: "01a0c622-d9d0-7bc2-924b-e32f5703bd59",
  type: "page-type/common-language-term",
  slug: "day",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "day" },
    { partOfSpeech: "part-of-speech/noun", spelling: "days" },
  ],
} as const satisfies CommonLanguageTerm
