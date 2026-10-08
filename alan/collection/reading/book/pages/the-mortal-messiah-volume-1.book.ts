import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMortalMessiahVolume1 = {
  id: "019db533-f39d-724d-9887-f0c246a315dc",
  type: "page-type/book",
  slug: "the-mortal-messiah-volume-1",
  title: "The Mortal Messiah Volume 1",
  status: "not-started",
  author: "Silas Farmer",
  unit: "unit/words",
  position: 2,
  ownLength: 126250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
