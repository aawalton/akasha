import type { Book } from "../../book.page-type.ts"

export const mitosis = {
  id: "019db533-f39d-71f6-8858-273de10fedfe",
  pageTypeSlug: "book",
  slug: "mitosis",
  title: "Mitosis",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 4,
  ownLength: 6250,
} as const satisfies Book
