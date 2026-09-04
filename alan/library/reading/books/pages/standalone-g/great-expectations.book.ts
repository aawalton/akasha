import type { Book } from "../../book.page-type.ts"

export const greatExpectations = {
  id: "019db533-f39d-7a91-9b74-2290c2685ea7",
  pageTypeSlug: "book",
  slug: "great-expectations",
  title: "Great Expectations",
  kind: "read",
  status: "not-started",
  author: "Charles Dickens",
  unitSlug: "words",
  position: 6,
  ownLength: 131500,
} as const satisfies Book
