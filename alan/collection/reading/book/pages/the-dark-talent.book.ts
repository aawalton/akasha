import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theDarkTalent = {
  id: "019db533-f39d-7047-9a45-946d39cb63d7",
  type: "page-type/book",
  slug: "the-dark-talent",
  title: "The Dark Talent",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 5,
  ownLength: 71000,
  ownProgress: 71000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
