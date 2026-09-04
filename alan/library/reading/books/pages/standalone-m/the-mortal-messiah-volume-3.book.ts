import type { Book } from "../../book.page-type.ts"

export const theMortalMessiahVolume3 = {
  id: "019db533-f39d-71e6-923a-be535d4dc362",
  pageTypeSlug: "book",
  slug: "the-mortal-messiah-volume-3",
  title: "The Mortal Messiah Volume 3",
  status: "not-started",
  author: "Silas Farmer",
  unitSlug: "words",
  position: 4,
  ownLength: 119000,
} as const satisfies Book
