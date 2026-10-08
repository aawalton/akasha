import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aMurderIsAnnounced = {
  id: "019db533-f399-7d40-b07a-9747b3fe8fed",
  type: "page-type/book",
  slug: "a-murder-is-announced",
  title: "A Murder is Announced",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 5,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
