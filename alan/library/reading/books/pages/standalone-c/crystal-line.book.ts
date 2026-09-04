import type { Book } from "../../book.page-type.ts"

export const crystalLine = {
  id: "019db533-f399-7de0-b042-a9397f57f5e0",
  pageTypeSlug: "book",
  slug: "crystal-line",
  title: "Crystal Line",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
} as const satisfies Book
