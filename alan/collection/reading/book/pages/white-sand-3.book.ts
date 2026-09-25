import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whiteSand3 = {
  id: "019db533-f39c-7fa2-8f75-629d82fffb30",
  type: "page-type/book",
  slug: "white-sand-3",
  title: "White Sand 3",
  status: "not-started",
  author: "Brandon Sanderson, Rik Hoskin, Fritz Casas",
  unit: "unit/words",
  position: 3,
  ownLength: 40000,
} as const satisfies Book
