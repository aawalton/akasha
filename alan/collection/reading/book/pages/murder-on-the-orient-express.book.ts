import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const murderOnTheOrientExpress = {
  id: "019db533-f399-7cea-a8cc-2fd8f40011a2",
  type: "page-type/book",
  slug: "murder-on-the-orient-express",
  title: "Murder on the Orient Express",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 9,
  ownLength: 64000,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
