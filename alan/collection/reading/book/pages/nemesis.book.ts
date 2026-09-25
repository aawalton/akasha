import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const nemesis = {
  id: "019db533-f399-7b8a-a6f4-f193708a01de",
  type: "page-type/book",
  slug: "nemesis",
  title: "Nemesis",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 12,
} as const satisfies Book
