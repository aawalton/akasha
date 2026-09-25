import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theArtOfThinkingClearly = {
  id: "019db533-f39e-7087-a802-38cbc553f5f8",
  type: "page-type/book",
  slug: "the-art-of-thinking-clearly",
  title: "The Art of Thinking Clearly",
  status: "not-started",
  author: "Rolf Dobelli, Rolf Dobelli",
  unit: "unit/words",
  ownLength: 117300,
} as const satisfies Book
