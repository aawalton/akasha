import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const edgedancer = {
  id: "019db533-f39d-7065-9ba7-dbbbb72d001e",
  type: "page-type/book",
  slug: "edgedancer",
  title: "Edgedancer",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 33500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
