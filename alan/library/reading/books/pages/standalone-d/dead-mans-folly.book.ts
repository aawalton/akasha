import type { Book } from "../../book.page-type.ts"

export const deadMansFolly = {
  id: "019db533-f399-7bf5-8257-24ba995a157d",
  pageTypeSlug: "book",
  slug: "dead-mans-folly",
  title: "Dead Man's Folly",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 27,
} as const satisfies Book
