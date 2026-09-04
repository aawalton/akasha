import type { Book } from "../../book.page-type.ts"

export const camilla = {
  id: "019db533-f39d-7bd7-85e1-74ad52f53e40",
  pageTypeSlug: "book",
  slug: "camilla",
  title: "Camilla",
  kind: "read",
  status: "not-started",
  author: "Jane Aiken Hodge",
  unitSlug: "words",
  position: 8,
  ownLength: 52750,
} as const satisfies Book
