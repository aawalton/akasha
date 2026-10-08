import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRithmatist = {
  id: "019db533-f39d-7273-80b0-eb874d10a945",
  type: "page-type/book",
  slug: "the-rithmatist",
  title: "The Rithmatist",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 93000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
