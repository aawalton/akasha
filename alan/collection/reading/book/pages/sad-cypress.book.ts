import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sadCypress = {
  id: "019db533-f399-7c40-a1f2-ab312d9bfb74",
  type: "page-type/book",
  slug: "sad-cypress",
  title: "Sad Cypress",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 18,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
