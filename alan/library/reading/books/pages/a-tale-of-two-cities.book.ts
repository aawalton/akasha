import type { Book } from "../book.page-type.types.ts"

export const aTaleOfTwoCities = {
  id: "019db533-f39d-7c1f-b596-2fc44a252246",
  pageTypeSlug: "book",
  type: "book",
  slug: "a-tale-of-two-cities",
  title: "A Tale of Two Cities",
  status: "not-started",
  author: "Charles Dickens",
  unit: "words",
  position: 2,
  ownLength: 90750,
} as const satisfies Book
