import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const nOrM = {
  id: "019db533-f399-7c20-bb8e-2f4e40061c9d",
  type: "page-type/book",
  slug: "n-or-m",
  title: "N or M?",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 3,
} as const satisfies Book
