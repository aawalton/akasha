import type { Book } from "../../book.page-type.ts"

export const cardsOnTheTable = {
  id: "019db533-f399-7c95-bcd7-10dc608aed9b",
  pageTypeSlug: "book",
  slug: "cards-on-the-table",
  title: "Cards on the Table",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 12,
} as const satisfies Book
