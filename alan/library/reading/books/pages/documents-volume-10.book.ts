import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const documentsVolume10 = {
  id: "019db533-f39d-74d3-ad05-9ddb0ad0b269",
  type: "book",
  slug: "documents-volume-10",
  title: "Documents Volume 10",
  status: "not-started",
  author: "Saint 1581-1660 Vincent De Paul",
  unit: "words",
  position: 10,
} as const satisfies Book
