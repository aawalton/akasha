import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMortalMessiahVolume3 = {
  id: "019db533-f39d-71e6-923a-be535d4dc362",
  type: "page-type/book",
  slug: "the-mortal-messiah-volume-3",
  title: "The Mortal Messiah Volume 3",
  status: "not-started",
  author: "Silas Farmer",
  unit: "unit/words",
  position: 4,
  ownLength: 119000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
