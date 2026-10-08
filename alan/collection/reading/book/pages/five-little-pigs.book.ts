import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const fiveLittlePigs = {
  id: "019db533-f399-7be0-a37f-b9095b145935",
  type: "page-type/book",
  slug: "five-little-pigs",
  title: "Five Little Pigs",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 21,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
