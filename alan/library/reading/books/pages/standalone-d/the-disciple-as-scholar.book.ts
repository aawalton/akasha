import type { Book } from "../../book.page-type.ts"

export const theDiscipleAsScholar = {
  id: "019db533-f39d-7856-8b54-384e23c56fb8",
  pageTypeSlug: "book",
  slug: "the-disciple-as-scholar",
  title: "The Disciple as Scholar",
  status: "paused",
  author: "Richard Lloyd Anderson, Stephen David Ricks, Donald W. Parry, Andrew H. Hedges",
  unitSlug: "words",
  position: 3,
  ownLength: 151500,
  ownProgress: 250,
} as const satisfies Book
