import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMortalMessiahVolume2 = {
  id: "019db533-f39d-71c6-9121-e5319b45c8c1",
  type: "page-type/book",
  slug: "the-mortal-messiah-volume-2",
  title: "The Mortal Messiah Volume 2",
  status: "not-started",
  author: "Silas Farmer",
  unit: "unit/words",
  position: 3,
  ownLength: 103250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
