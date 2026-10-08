import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const articlesOfFaith = {
  id: "019db533-f39d-755f-a38c-b9163c10ff4c",
  type: "page-type/book",
  slug: "articles-of-faith",
  title: "Articles of Faith",
  status: "not-started",
  author: "Ronald Harwood",
  unit: "unit/words",
  position: 2,
  ownLength: 88750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
