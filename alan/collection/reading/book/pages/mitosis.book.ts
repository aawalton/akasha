import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const mitosis = {
  id: "019db533-f39d-71f6-8858-273de10fedfe",
  type: "page-type/book",
  slug: "mitosis",
  title: "Mitosis",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 4,
  ownLength: 6250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
