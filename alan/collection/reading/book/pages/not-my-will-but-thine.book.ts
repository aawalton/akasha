import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const notMyWillButThine = {
  id: "019db533-f39d-70e3-9ec6-973bd9f53a42",
  type: "page-type/book",
  slug: "not-my-will-but-thine",
  title: "Not My Will, But Thine",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 3,
  ownLength: 36000,
  ownProgress: 36000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
