import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const threeActTragedy = {
  id: "019db533-f399-7c2a-8633-93ad4508a7b9",
  type: "page-type/book",
  slug: "three-act-tragedy",
  title: "Three Act Tragedy",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 10,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
