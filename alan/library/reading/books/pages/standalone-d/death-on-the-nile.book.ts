import type { Book } from "../../book.page-type.ts"

export const deathOnTheNile = {
  id: "019db533-f399-7d0a-94ad-a0cfdf7243c3",
  pageTypeSlug: "book",
  slug: "death-on-the-nile",
  title: "Death on the Nile",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 15,
} as const satisfies Book
