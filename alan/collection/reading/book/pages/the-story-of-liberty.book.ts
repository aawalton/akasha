import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theStoryOfLiberty = {
  id: "019db533-f39d-758e-a656-fc30d4fed984",
  type: "page-type/book",
  slug: "the-story-of-liberty",
  title: "The Story of Liberty",
  status: "not-started",
  author: "Charles Carleton Coffin",
  unit: "unit/words",
  position: 9,
  ownLength: 101000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
