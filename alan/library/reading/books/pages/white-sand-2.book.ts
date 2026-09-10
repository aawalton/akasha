import type { Book } from "../book.page-type.types.ts"

export const whiteSand2 = {
  id: "019db533-f39c-7f92-a221-d44a0fec1dcb",
  pageTypeSlug: "book",
  type: "book",
  slug: "white-sand-2",
  title: "White Sand 2",
  status: "not-started",
  author: "Brandon Sanderson, Rik Hoskin, Julius M. Gopez",
  unit: "words",
  position: 2,
  ownLength: 40000,
} as const satisfies Book
