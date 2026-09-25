import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const play = {
  id: "019db533-f39e-7022-91f9-bae533384e16",
  type: "page-type/book",
  slug: "play",
  title: "Play",
  status: "not-started",
  author: "Eric Berne",
  unit: "unit/words",
  ownLength: 105450,
} as const satisfies Book
