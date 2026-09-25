import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMortalMessiahVolume4 = {
  id: "019db533-f39d-70fb-a066-94f7a52fce60",
  type: "page-type/book",
  slug: "the-mortal-messiah-volume-4",
  title: "The Mortal Messiah Volume 4",
  status: "not-started",
  author: "Silas Farmer",
  unit: "unit/words",
  position: 5,
  ownLength: 109250,
} as const satisfies Book
