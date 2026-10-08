import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theScrivenersBones = {
  id: "019db533-f39d-71fe-921d-f4c58cf7430b",
  type: "page-type/book",
  slug: "the-scriveners-bones",
  title: "The Scrivener's Bones",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 2,
  ownLength: 89250,
  ownProgress: 89250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
