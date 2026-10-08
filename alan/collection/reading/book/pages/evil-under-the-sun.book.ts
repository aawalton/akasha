import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const evilUnderTheSun = {
  id: "019db533-f399-7c35-97c8-f390898a5502",
  type: "page-type/book",
  slug: "evil-under-the-sun",
  title: "Evil Under the Sun",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 20,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
