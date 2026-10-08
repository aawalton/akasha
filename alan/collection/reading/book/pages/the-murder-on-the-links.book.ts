import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMurderOnTheLinks = {
  id: "019db533-f399-7c80-af2c-3446f93fdefb",
  type: "page-type/book",
  slug: "the-murder-on-the-links",
  title: "The Murder on the Links",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 2,
  ownLength: 80000,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
