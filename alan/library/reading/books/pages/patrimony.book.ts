import type { Book } from "../book.page-type.types.ts"

export const patrimony = {
  id: "019db533-f399-7aca-b2df-0c4a8453f0b6",
  pageTypeSlug: "book",
  type: "book",
  slug: "patrimony",
  title: "Patrimony",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "words",
  position: 13,
} as const satisfies Book
