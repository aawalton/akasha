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
} as const satisfies Book
