import type { Book } from "../../book.page-type.ts"

export const myMath = {
  id: "01a0659d-311d-7003-87a9-e1b37ba025d3",
  pageTypeSlug: "book",
  slug: "my-math",
  title: "My Math",
  kind: "written",
  unitSlug: "words",
} as const satisfies Book
