import type { Book } from "../book.page-type.types.ts"

export const whiteSand1 = {
  id: "019db533-f39c-7f99-889e-d5fc7befd3c9",
  pageTypeSlug: "book",
  type: "book",
  slug: "white-sand-1",
  title: "White Sand 1",
  status: "not-started",
  author: "Brandon Sanderson, Rik Hoskin, Julius M. Gopez",
  unit: "words",
  position: 1,
  ownLength: 40000,
} as const satisfies Book
