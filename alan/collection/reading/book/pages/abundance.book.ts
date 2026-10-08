import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const abundance = {
  id: "019db533-f39e-721d-bdce-4f08e7c84710",
  type: "page-type/book",
  slug: "abundance",
  title: "Abundance",
  status: "completed",
  grade: "A",
  author: "John Green",
  unit: "unit/words",
  ownLength: 108450,
  ownProgress: 108450,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
