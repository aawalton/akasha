import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecondWorldWarVolume1 = {
  id: "019db533-f39d-7386-b157-c2622cb29897",
  type: "page-type/book",
  slug: "the-second-world-war-volume-1",
  title: "The Second World War Volume 1",
  status: "not-started",
  author: "Winston S. Churchill",
  unit: "unit/words",
  position: 1,
  ownLength: 190250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
