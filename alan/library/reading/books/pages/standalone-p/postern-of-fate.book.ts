import type { Book } from "../../book.page-type.ts"

export const posternOfFate = {
  id: "019db533-f399-7c75-84f8-de76ff96edcd",
  pageTypeSlug: "book",
  slug: "postern-of-fate",
  title: "Postern of Fate",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 5,
} as const satisfies Book
