import type { Book } from "../../book.page-type.ts"

export const alcatrazVsTheEvilLibrarians = {
  id: "019db533-f39d-7395-8529-7b502ffa0bf1",
  pageTypeSlug: "book",
  slug: "alcatraz-vs-the-evil-librarians",
  title: "Alcatraz vs the Evil Librarians",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 1,
  ownLength: 78250,
  ownProgress: 78250,
} as const satisfies Book
