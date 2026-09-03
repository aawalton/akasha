import type { Book } from "../../book.page-type.ts"

export const theHollow = {
  id: "019db533-f399-7cf5-bccf-2a3f0e8b52e4",
  pageTypeSlug: "book",
  slug: "the-hollow",
  title: "The Hollow",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 22,
} as const satisfies Book
