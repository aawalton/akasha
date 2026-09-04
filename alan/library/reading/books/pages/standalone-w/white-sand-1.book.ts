import type { Book } from "../../book.page-type.ts"

export const whiteSand1 = {
  id: "019db533-f39c-7f99-889e-d5fc7befd3c9",
  pageTypeSlug: "book",
  slug: "white-sand-1",
  title: "White Sand 1",
  status: "not-started",
  author: "Brandon Sanderson, Rik Hoskin, Julius M. Gopez",
  unitSlug: "words",
  position: 1,
  ownLength: 40000,
} as const satisfies Book
