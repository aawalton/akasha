import type { Book } from "../../book.page-type.ts"

export const bastilleVsTheEvilLibrarians = {
  id: "019db533-f39d-7308-afbc-169c56e8c4f8",
  pageTypeSlug: "book",
  slug: "bastille-vs-the-evil-librarians",
  title: "Bastille vs the Evil Librarians",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 6,
  ownLength: 65750,
  ownProgress: 65750,
} as const satisfies Book
