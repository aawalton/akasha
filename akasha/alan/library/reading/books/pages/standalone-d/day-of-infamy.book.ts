import type { Book } from "../../book.page-type.ts"

export const dayOfInfamy = {
  id: "019db533-f39d-7b48-8360-9667f0ba4240",
  pageTypeSlug: "book",
  slug: "day-of-infamy",
  title: "Day of Infamy",
  kind: "read",
  status: "not-started",
  author: "Walter Lord",
  unitSlug: "words",
  position: 11,
  ownLength: 53000,
} as const satisfies Book
