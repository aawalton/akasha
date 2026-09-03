import type { Book } from "../../book.page-type.ts"

export const theArtOfThinkingClearly = {
  id: "019db533-f39e-7087-a802-38cbc553f5f8",
  pageTypeSlug: "book",
  slug: "the-art-of-thinking-clearly",
  title: "The Art of Thinking Clearly",
  kind: "read",
  status: "not-started",
  author: "Rolf Dobelli, Rolf Dobelli",
  unitSlug: "words",
  ownLength: 117300,
} as const satisfies Book
