import type { Book } from "../../book.page-type.ts"

export const mobyDick = {
  id: "019db533-f39d-7ab7-8690-69a7bad358cb",
  pageTypeSlug: "book",
  slug: "moby-dick",
  title: "Moby Dick",
  status: "not-started",
  author: "Herman Melville",
  unitSlug: "words",
  position: 4,
  ownLength: 153750,
} as const satisfies Book
