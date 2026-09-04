import type { Book } from "../../book.page-type.ts"

export const theRootsOfAmericanOrder = {
  id: "019db533-f39d-75c0-9ff6-b056ccf14261",
  pageTypeSlug: "book",
  slug: "the-roots-of-american-order",
  title: "The Roots of American Order",
  status: "not-started",
  author: "Russell Kirk",
  unitSlug: "words",
  position: 8,
  ownLength: 119000,
} as const satisfies Book
