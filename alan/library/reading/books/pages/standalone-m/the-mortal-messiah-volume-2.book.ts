import type { Book } from "../../book.page-type.ts"

export const theMortalMessiahVolume2 = {
  id: "019db533-f39d-71c6-9121-e5319b45c8c1",
  pageTypeSlug: "book",
  slug: "the-mortal-messiah-volume-2",
  title: "The Mortal Messiah Volume 2",
  status: "not-started",
  author: "Silas Farmer",
  unitSlug: "words",
  position: 3,
  ownLength: 103250,
} as const satisfies Book
