import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const aMurderIsAnnounced = {
  id: "019db533-f399-7d40-b07a-9747b3fe8fed",
  type: "book",
  slug: "a-murder-is-announced",
  title: "A Murder is Announced",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 5,
} as const satisfies Book
