import type { Book } from "../../book.page-type.ts"

export const whiteSand2 = {
  id: "019db533-f39c-7f92-a221-d44a0fec1dcb",
  pageTypeSlug: "book",
  slug: "white-sand-2",
  title: "White Sand 2",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson, Rik Hoskin, Julius M. Gopez",
  unitSlug: "words",
  position: 2,
  ownLength: 40000,
} as const satisfies Book
