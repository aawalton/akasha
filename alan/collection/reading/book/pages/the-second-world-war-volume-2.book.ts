import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecondWorldWarVolume2 = {
  id: "019db533-f39d-738e-857e-c9b4f59a6eb1",
  type: "page-type/book",
  slug: "the-second-world-war-volume-2",
  title: "The Second World War Volume 2",
  status: "not-started",
  author: "Winston S. Churchill",
  unit: "unit/words",
  position: 2,
  ownLength: 180500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
