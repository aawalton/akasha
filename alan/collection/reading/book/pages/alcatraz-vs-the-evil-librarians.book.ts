import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alcatrazVsTheEvilLibrarians = {
  id: "019db533-f39d-7395-8529-7b502ffa0bf1",
  type: "page-type/book",
  slug: "alcatraz-vs-the-evil-librarians",
  title: "Alcatraz vs the Evil Librarians",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 1,
  ownLength: 78250,
  ownProgress: 78250,
} as const satisfies Book
