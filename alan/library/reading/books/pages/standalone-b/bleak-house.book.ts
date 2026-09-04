import type { Book } from "../../book.page-type.ts"

export const bleakHouse = {
  id: "019db533-f39d-7bde-99c3-2dfa4b497c0e",
  pageTypeSlug: "book",
  slug: "bleak-house",
  title: "Bleak House",
  status: "not-started",
  author: "Charles Dickens",
  unitSlug: "words",
  position: 9,
  ownLength: 218500,
} as const satisfies Book
