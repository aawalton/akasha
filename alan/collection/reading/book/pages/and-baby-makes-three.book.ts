import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const andBabyMakesThree = {
  id: "019db533-f38a-720b-b137-7086d5b0bac1",
  type: "page-type/book",
  slug: "and-baby-makes-three",
  title: "And Baby Makes Three",
  status: "not-started",
  author: "Rebecca Winters, Christine Sparks",
  unit: "unit/words",
  ownLength: 114750,
  publishedAt: "2017-05-23",
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
