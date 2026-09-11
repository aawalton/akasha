import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const dragonsinger = {
  id: "019db533-f399-7dab-a4b6-6c84a420a277",
  type: "book",
  slug: "dragonsinger",
  title: "Dragonsinger",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "words",
  position: 18,
  ownLength: 66000,
} as const satisfies Book
