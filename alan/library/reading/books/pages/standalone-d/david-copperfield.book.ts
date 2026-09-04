import type { Book } from "../../book.page-type.ts"

export const davidCopperfield = {
  id: "019db533-f39d-7baf-8ba3-212209a6fa2c",
  pageTypeSlug: "book",
  slug: "david-copperfield",
  title: "David Copperfield",
  status: "not-started",
  author: "Charles Dickens",
  unitSlug: "words",
  position: 7,
  ownLength: 217750,
} as const satisfies Book
