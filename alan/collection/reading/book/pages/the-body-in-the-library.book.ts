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
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
