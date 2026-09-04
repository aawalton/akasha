import type { Book } from "../../book.page-type.ts"

export const theBigFour = {
  id: "019db533-f399-7c00-95a7-17693d4da3ea",
  pageTypeSlug: "book",
  slug: "the-big-four",
  title: "The Big Four",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 5,
  ownLength: 70500,
} as const satisfies Book
