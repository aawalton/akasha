import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theyDoItWithMirrors = {
  id: "019db533-f399-7baa-b8de-d8c412c5c544",
  type: "page-type/book",
  slug: "they-do-it-with-mirrors",
  title: "They Do It with Mirrors",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 6,
} as const satisfies Book
