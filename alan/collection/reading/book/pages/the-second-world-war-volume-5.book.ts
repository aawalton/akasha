import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecondWorldWarVolume5 = {
  id: "019db533-f39d-732f-a902-30d2c1e68ada",
  type: "page-type/book",
  slug: "the-second-world-war-volume-5",
  title: "The Second World War Volume 5",
  status: "not-started",
  author: "Winston S. Churchill",
  unit: "unit/words",
  position: 5,
  ownLength: 178750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
