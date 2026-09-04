import type { Book } from "../../book.page-type.ts"

export const forThePowerIsInThem = {
  id: "019db533-f39d-72e2-b5fc-ce7e2fabe245",
  pageTypeSlug: "book",
  slug: "for-the-power-is-in-them",
  title: '"For the Power Is in Them..."',
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 2,
  ownLength: 15750,
  ownProgress: 15750,
} as const satisfies Book
