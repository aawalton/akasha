import type { Book } from "../../book.page-type.ts"

export const theMillennialMessiah = {
  id: "019db533-f39d-719c-a81e-0b423bfffad7",
  pageTypeSlug: "book",
  slug: "the-millennial-messiah",
  title: "The Millennial Messiah",
  status: "not-started",
  author: "Bruce R. McConkie",
  unitSlug: "words",
  position: 6,
  ownLength: 177750,
} as const satisfies Book
