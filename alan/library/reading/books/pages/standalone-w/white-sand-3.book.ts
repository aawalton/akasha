import type { Book } from "../../book.page-type.ts"

export const whiteSand3 = {
  id: "019db533-f39c-7fa2-8f75-629d82fffb30",
  pageTypeSlug: "book",
  slug: "white-sand-3",
  title: "White Sand 3",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson, Rik Hoskin, Fritz Casas",
  unitSlug: "words",
  position: 3,
  ownLength: 40000,
} as const satisfies Book
