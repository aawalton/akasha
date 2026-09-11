import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const crystalLine = {
  id: "019db533-f399-7de0-b042-a9397f57f5e0",
  pageTypeSlug: "book",
  type: "book",
  slug: "crystal-line",
  title: "Crystal Line",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "words",
} as const satisfies Book
