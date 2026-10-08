import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const throughTheYears = {
  id: "019db533-f39d-75a5-81d5-26bcdda9f784",
  type: "page-type/book",
  slug: "through-the-years",
  title: "Through The Years",
  status: "paused",
  author: "Linda Howard, Fern Michaels, Debbie Macomber",
  unit: "unit/words",
  position: 1,
  ownLength: 22750,
  ownProgress: 750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
