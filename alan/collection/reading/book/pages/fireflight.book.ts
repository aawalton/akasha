import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const fireflight = {
  id: "019db533-f39d-71bf-aea9-51a4f5cde39b",
  type: "page-type/book",
  slug: "fireflight",
  title: "Fireflight",
  status: "not-started",
  author: "Gregory Grayson",
  unit: "unit/words",
  position: 2,
  ownLength: 105250,
} as const satisfies Book
