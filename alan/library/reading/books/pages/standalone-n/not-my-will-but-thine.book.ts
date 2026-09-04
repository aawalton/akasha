import type { Book } from "../../book.page-type.ts"

export const notMyWillButThine = {
  id: "019db533-f39d-70e3-9ec6-973bd9f53a42",
  pageTypeSlug: "book",
  slug: "not-my-will-but-thine",
  title: "Not My Will, But Thine",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 3,
  ownLength: 36000,
  ownProgress: 36000,
} as const satisfies Book
