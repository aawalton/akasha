import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const greatBooksOfTheWesternWorld = {
  id: "01a18da4-5be3-7662-968e-8c6a020997fe",
  type: "page-type/common-language-term",
  slug: "great-books-of-the-western-world",
  definition: "a published set of books that has a plan of readings for ten years",
  spellings: [
    { partOfSpeech: "part-of-speech/proper-noun", spelling: "Great Books of the Western World" },
  ],
  createdAt: "2026-10-30T16:28:41.314Z",
  updatedAt: "2026-10-30T16:28:41.314Z",
} as const satisfies CommonLanguageTerm
