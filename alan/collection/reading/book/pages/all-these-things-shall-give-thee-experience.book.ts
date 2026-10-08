import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const allTheseThingsShallGiveTheeExperience = {
  id: "019db533-f39d-7292-a645-dd88e3345805",
  type: "page-type/book",
  slug: "all-these-things-shall-give-thee-experience",
  title: "All These Things Shall Give Thee Experience",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 4,
  ownLength: 32000,
  ownProgress: 32000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
