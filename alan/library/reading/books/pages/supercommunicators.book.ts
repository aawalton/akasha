import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const supercommunicators = {
  id: "019db533-f39e-7067-ba30-20cbb6726512",
  type: "book",
  slug: "supercommunicators",
  title: "Supercommunicators",
  status: "not-started",
  author: "Charles Duhigg",
  unit: "words",
  ownLength: 112050,
} as const satisfies Book
