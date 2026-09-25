import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const lordEdgwareDies = {
  id: "019db533-f399-7d4b-b5cd-9523682f9983",
  type: "page-type/book",
  slug: "lord-edgware-dies",
  title: "Lord Edgware Dies",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 8,
} as const satisfies Book
