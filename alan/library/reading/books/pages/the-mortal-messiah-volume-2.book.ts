import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const theMortalMessiahVolume2 = {
  id: "019db533-f39d-71c6-9121-e5319b45c8c1",
  type: "book",
  slug: "the-mortal-messiah-volume-2",
  title: "The Mortal Messiah Volume 2",
  status: "not-started",
  author: "Silas Farmer",
  unit: "words",
  position: 3,
  ownLength: 103250,
} as const satisfies Book
