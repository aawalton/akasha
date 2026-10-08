import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const spyTheLie = {
  id: "019db533-f39d-7f83-9a80-b01bf406b538",
  type: "page-type/book",
  slug: "spy-the-lie",
  title: "Spy the Lie",
  status: "not-started",
  author: "Philip Houston",
  unit: "unit/words",
  ownLength: 73050,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
