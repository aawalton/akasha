import type { Book } from "../../book.page-type.ts"

export const theDarkTalent = {
  id: "019db533-f39d-7047-9a45-946d39cb63d7",
  pageTypeSlug: "book",
  slug: "the-dark-talent",
  title: "The Dark Talent",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 5,
  ownLength: 71000,
  ownProgress: 71000,
} as const satisfies Book
