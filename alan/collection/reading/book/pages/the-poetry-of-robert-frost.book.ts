import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePoetryOfRobertFrost = {
  id: "019db533-f39d-759e-a12b-936d126a1844",
  type: "page-type/book",
  slug: "the-poetry-of-robert-frost",
  title: "The Poetry of Robert Frost",
  status: "paused",
  author: "Robert Frost",
  unit: "unit/words",
  position: 2,
  ownLength: 132000,
  ownProgress: 59500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
