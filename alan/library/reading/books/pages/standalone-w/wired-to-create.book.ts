import type { Book } from "../../book.page-type.ts"

export const wiredToCreate = {
  id: "019db533-f39d-7e07-993c-943fe19ef8ce",
  pageTypeSlug: "book",
  slug: "wired-to-create",
  title: "Wired to Create",
  status: "not-started",
  author: "Scott Barry Kaufman",
  unitSlug: "words",
  ownLength: 99750,
} as const satisfies Book
