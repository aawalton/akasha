import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const byThePrickingOfMyThumbs = {
  id: "019db533-f399-7d35-982b-4d4a33c8a3e6",
  type: "page-type/book",
  slug: "by-the-pricking-of-my-thumbs",
  title: "By the Pricking of My Thumbs",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 4,
} as const satisfies Book
