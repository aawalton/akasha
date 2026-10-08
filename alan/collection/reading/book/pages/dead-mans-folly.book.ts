import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const deadMansFolly = {
  id: "019db533-f399-7bf5-8257-24ba995a157d",
  type: "page-type/book",
  slug: "dead-mans-folly",
  title: "Dead Man's Folly",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 27,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
