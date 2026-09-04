import type { Book } from "../../book.page-type.ts"

export const theWayOfKingsPrime = {
  id: "019db533-f39c-7fc2-958b-c18fdd72b2a0",
  pageTypeSlug: "book",
  slug: "the-way-of-kings-prime",
  title: "The Way of Kings Prime",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 7,
  ownLength: 200500,
} as const satisfies Book
