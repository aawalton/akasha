import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const play = {
  id: "019db533-f39e-7022-91f9-bae533384e16",
  type: "page-type/book",
  slug: "play",
  title: "Play",
  status: "not-started",
  author: "Eric Berne",
  unit: "unit/words",
  ownLength: 105450,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
