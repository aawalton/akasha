import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const afterTheFuneral = {
  id: "019db533-f399-7c0b-b9b0-2db342c1f30d",
  type: "page-type/book",
  slug: "after-the-funeral",
  title: "After the Funeral",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 25,
} as const satisfies Book
