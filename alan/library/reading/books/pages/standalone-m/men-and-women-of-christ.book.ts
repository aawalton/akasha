import type { Book } from "../../book.page-type.ts"

export const menAndWomenOfChrist = {
  id: "019db533-f39d-706e-ab10-aec8e6adb6e1",
  pageTypeSlug: "book",
  slug: "men-and-women-of-christ",
  title: "Men and Women of Christ",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 5,
  ownLength: 33000,
  ownProgress: 33000,
} as const satisfies Book
