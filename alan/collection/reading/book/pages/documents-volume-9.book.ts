import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume9 = {
  id: "019db533-f39d-747a-8beb-323adf43065d",
  type: "page-type/book",
  slug: "documents-volume-9",
  title: "Documents Volume 9",
  status: "not-started",
  author: "New York (State). Legislature",
  unit: "unit/words",
  position: 9,
} as const satisfies Book
