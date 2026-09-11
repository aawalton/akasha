import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const byThePrickingOfMyThumbs = {
  id: "019db533-f399-7d35-982b-4d4a33c8a3e6",
  type: "book",
  slug: "by-the-pricking-of-my-thumbs",
  title: "By the Pricking of My Thumbs",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 4,
} as const satisfies Book
