import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecondWorldWarVolume3 = {
  id: "019db533-f39d-7317-b2a4-5a813acf9d55",
  type: "page-type/book",
  slug: "the-second-world-war-volume-3",
  title: "The Second World War Volume 3",
  status: "not-started",
  author: "Winston S. Churchill",
  unit: "unit/words",
  position: 3,
  ownLength: 217750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
