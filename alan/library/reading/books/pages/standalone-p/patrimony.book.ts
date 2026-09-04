import type { Book } from "../../book.page-type.ts"

export const patrimony = {
  id: "019db533-f399-7aca-b2df-0c4a8453f0b6",
  pageTypeSlug: "book",
  slug: "patrimony",
  title: "Patrimony",
  kind: "read",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 13,
} as const satisfies Book
