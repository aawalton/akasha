import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const book = {
  id: "01a0c600-6105-77c9-9f72-d53358882b0b",
  type: "page-type/common-language-term",
  slug: "book",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "book" },
    { partOfSpeech: "part-of-speech/noun", spelling: "books" },
  ],
} as const satisfies CommonLanguageTerm
