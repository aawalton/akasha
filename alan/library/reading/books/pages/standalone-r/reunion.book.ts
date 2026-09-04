import type { Book } from "../../book.page-type.ts"

export const reunion = {
  id: "019db533-f399-7aea-ae40-9b41d16ed02e",
  pageTypeSlug: "book",
  slug: "reunion",
  title: "Reunion",
  status: "not-started",
  author: "Fred Uhlman",
  unitSlug: "words",
  position: 8,
} as const satisfies Book
