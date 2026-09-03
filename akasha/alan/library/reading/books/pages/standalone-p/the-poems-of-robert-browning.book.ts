import type { Book } from "../../book.page-type.ts"

export const thePoemsOfRobertBrowning = {
  id: "019db533-f39d-75ee-bcb9-619efda5a0df",
  pageTypeSlug: "book",
  slug: "the-poems-of-robert-browning",
  title: "The Poems of Robert Browning",
  kind: "read",
  status: "not-started",
  author: "Robert Browning, Daniel Karlin, John Woolford",
  unitSlug: "words",
  position: 2,
  ownLength: 72000,
} as const satisfies Book
