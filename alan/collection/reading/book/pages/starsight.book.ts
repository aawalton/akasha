import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const starsight = {
  id: "019db533-f39d-700d-a96d-d2d3376e0b39",
  type: "page-type/book",
  slug: "starsight",
  title: "Starsight",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 2,
  ownLength: 115250,
  ownProgress: 115250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
