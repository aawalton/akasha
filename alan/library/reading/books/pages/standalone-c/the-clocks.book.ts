import type { Book } from "../../book.page-type.ts"

export const theClocks = {
  id: "019db533-f399-7d00-8065-005db4c0c792",
  pageTypeSlug: "book",
  slug: "the-clocks",
  title: "The Clocks",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 29,
} as const satisfies Book
