import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const afterTheFuneral = {
  id: "019db533-f399-7c0b-b9b0-2db342c1f30d",
  type: "book",
  slug: "after-the-funeral",
  title: "After the Funeral",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 25,
} as const satisfies Book
