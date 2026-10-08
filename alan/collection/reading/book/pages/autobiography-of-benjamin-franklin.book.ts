import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const autobiographyOfBenjaminFranklin = {
  id: "019db533-f39d-7b32-b023-e872a39d6f3f",
  type: "page-type/book",
  slug: "autobiography-of-benjamin-franklin",
  title: "Autobiography of Benjamin Franklin",
  status: "completed",
  grade: "A",
  author: "Benjamin Franklin, D. Brown",
  unit: "unit/words",
  position: 1,
  ownLength: 68000,
  ownProgress: 68000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
