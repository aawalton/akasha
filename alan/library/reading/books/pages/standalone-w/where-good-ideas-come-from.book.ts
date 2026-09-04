import type { Book } from "../../book.page-type.ts"

export const whereGoodIdeasComeFrom = {
  id: "019db533-f39d-7e17-bf39-1a679951e5cd",
  pageTypeSlug: "book",
  slug: "where-good-ideas-come-from",
  title: "Where Good Ideas Come From",
  status: "not-started",
  author: "Steven Johnson",
  unitSlug: "words",
  ownLength: 107550,
} as const satisfies Book
