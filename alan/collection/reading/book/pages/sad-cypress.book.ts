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
} as const satisfies Book
