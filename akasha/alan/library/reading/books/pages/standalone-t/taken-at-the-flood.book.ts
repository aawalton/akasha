import type { Book } from "../../book.page-type.ts"

export const takenAtTheFlood = {
  id: "019db533-f399-7cc0-8f01-c135e73c68cb",
  pageTypeSlug: "book",
  slug: "taken-at-the-flood",
  title: "Taken at the Flood",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 23,
} as const satisfies Book
