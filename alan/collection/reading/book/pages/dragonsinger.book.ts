import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonsinger = {
  id: "019db533-f399-7dab-a4b6-6c84a420a277",
  type: "page-type/book",
  slug: "dragonsinger",
  title: "Dragonsinger",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 18,
  ownLength: 66000,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
