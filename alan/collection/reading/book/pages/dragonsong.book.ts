import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonsong = {
  id: "019db533-f399-7dcb-a5c6-af401904d3fa",
  type: "page-type/book",
  slug: "dragonsong",
  title: "Dragonsong",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 17,
  ownLength: 50500,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
