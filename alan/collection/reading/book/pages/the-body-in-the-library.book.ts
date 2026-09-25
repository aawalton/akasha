import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBodyInTheLibrary = {
  id: "019db533-f399-7cb5-9a01-9ff320b5c7f6",
  type: "page-type/book",
  slug: "the-body-in-the-library",
  title: "The Body in the Library",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 3,
} as const satisfies Book
