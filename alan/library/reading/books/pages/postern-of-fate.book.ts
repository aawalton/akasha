import type { Book } from "../book.page-type.ts"

export const posternOfFate = {
  id: "019db533-f399-7c75-84f8-de76ff96edcd",
  pageTypeSlug: "book",
  type: "book",
  slug: "postern-of-fate",
  title: "Postern of Fate",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 5,
} as const satisfies Book
