import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bastilleVsTheEvilLibrarians = {
  id: "019db533-f39d-7308-afbc-169c56e8c4f8",
  type: "page-type/book",
  slug: "bastille-vs-the-evil-librarians",
  title: "Bastille vs the Evil Librarians",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 6,
  ownLength: 65750,
  ownProgress: 65750,
} as const satisfies Book
