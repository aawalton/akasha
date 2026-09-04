import type { Book } from "../../book.page-type.ts"

export const littleDorrit = {
  id: "019db533-f39d-7abf-af52-0b511f269ed4",
  pageTypeSlug: "book",
  slug: "little-dorrit",
  title: "Little Dorrit",
  kind: "read",
  status: "not-started",
  author: "Charles Dickens, Mary Sebag-Montefiore, Adam Leverton",
  unitSlug: "words",
  position: 8,
  ownLength: 213000,
} as const satisfies Book
