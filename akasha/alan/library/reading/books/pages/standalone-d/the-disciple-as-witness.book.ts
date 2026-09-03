import type { Book } from "../../book.page-type.ts"

export const theDiscipleAsWitness = {
  id: "019db533-f39d-7924-a5be-bf21e1b1f543",
  pageTypeSlug: "book",
  slug: "the-disciple-as-witness",
  title: "The Disciple as Witness",
  kind: "read",
  status: "not-started",
  author: "Richard Lloyd Anderson, Stephen David Ricks, Donald W. Parry, Andrew H. Hedges",
  unitSlug: "words",
  position: 2,
  ownLength: 134500,
} as const satisfies Book
