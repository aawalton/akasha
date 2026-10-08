import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfBrighamYoung = {
  id: "019db533-f39d-7a0b-80fd-af7e7ee58762",
  type: "page-type/book",
  slug: "teachings-of-brigham-young",
  title: "Teachings of Brigham Young",
  status: "not-started",
  author: "Brigham Young",
  unit: "unit/words",
  position: 2,
  ownLength: 121250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
