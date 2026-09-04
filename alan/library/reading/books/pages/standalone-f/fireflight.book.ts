import type { Book } from "../../book.page-type.ts"

export const fireflight = {
  id: "019db533-f39d-71bf-aea9-51a4f5cde39b",
  pageTypeSlug: "book",
  slug: "fireflight",
  title: "Fireflight",
  status: "not-started",
  author: "Gregory Grayson",
  unitSlug: "words",
  position: 2,
  ownLength: 105250,
} as const satisfies Book
