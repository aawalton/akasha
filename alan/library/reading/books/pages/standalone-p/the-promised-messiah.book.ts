import type { Book } from "../../book.page-type.ts"

export const thePromisedMessiah = {
  id: "019db533-f39d-7039-bb20-1ba4797291dd",
  pageTypeSlug: "book",
  slug: "the-promised-messiah",
  title: "The Promised Messiah",
  status: "paused",
  author: "Bruce R. McConkie",
  unitSlug: "words",
  position: 1,
  ownLength: 153750,
  ownProgress: 8500,
} as const satisfies Book
