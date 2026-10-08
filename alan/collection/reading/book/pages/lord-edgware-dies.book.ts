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
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
