import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfJosephSmith = {
  id: "019db533-f39d-7933-8f26-0b20a6d2dea2",
  type: "page-type/book",
  slug: "teachings-of-joseph-smith",
  title: "Teachings of Joseph Smith",
  status: "completed",
  grade: "B",
  author: "Joseph Smith, Jr.",
  unit: "unit/words",
  position: 1,
  ownLength: 182500,
  ownProgress: 182500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
