import type { Book } from "../../book.page-type.ts"

export const journeyToZion = {
  id: "019db533-f39d-79ab-80de-51a939747d5f",
  pageTypeSlug: "book",
  slug: "journey-to-zion",
  title: "Journey to Zion",
  status: "not-started",
  author: "Carol Cornwall Madsen",
  unitSlug: "words",
  position: 1,
} as const satisfies Book
